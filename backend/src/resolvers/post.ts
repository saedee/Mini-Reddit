import { Post } from "../entities/Post";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types/MyContext";
import { isAuth } from "../middleware/isAuth";
import { PostInput } from "../types/PostInput";
import { getConnection } from "typeorm";
import { Updoot } from "../entities/Updoot";
import { User } from "../entities/User";

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];

  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() post: Post) {
    return post.text.slice(0, 50);
  }

  @FieldResolver(() => User)
  creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(post.creatorId);
  }

  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(@Root() post: Post, @Ctx() { updootLoader, req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    const updoot = await updootLoader.load({ postId: post.id, userId: req.session.userId });
    return updoot ? updoot.value : null;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: MyContext,
  ) {
    const isUpdoot = value !== -1;
    const realValue = isUpdoot ? 1 : -1;
    const { userId } = req.session;

    const updoot = await Updoot.findOne({ where: { postId, userId } });
    if (updoot && updoot.value !== realValue) {
      // the user has voted on the post before and they are changing their vote
      await getConnection().transaction(async (tm) => {
        await tm.query(`   update updoot
          set value = ${realValue}
          where "postId" = ${postId} and "userId" = ${userId}`);

        await tm.query(`   update post
          set points = points + ${2 * realValue}
          where id = ${postId}`);
      });
    } else if (!updoot) {
      // has never voted on the post before
      await getConnection().transaction(async (tm) => {
        await tm.query(`
          insert into updoot("userId", "postId", value)
          values(${userId}, ${postId}, ${realValue})
        `);

        await tm.query(`   update post
          set points = points + ${realValue}
          where id = ${postId}`);
      });
    }
    return true;
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    // using raw query
    const posts = await getConnection().query(
      `
    select p.* from post p
    ${cursor ? `where p."createdAt" < $2` : ""}
    order by p."createdAt" DESC
    limit $1
    `,
      replacements,
    );

    // using querybuilder
    // const qb = getConnection()
    //   .getRepository(Post)
    //   .createQueryBuilder("p")
    //   .innerJoinAndSelect("p.creator", "u", 'u.id = p."creatorId"')
    //   .orderBy('p."createdAt"', "DESC")
    //   .take(realLimitPlusOne);
    // if (cursor) {
    //   qb.where('p."createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });
    // }
    // const posts = await qb.getMany();

    return { posts: posts.slice(0, realLimit), hasMore: posts.length === realLimitPlusOne };
  }

  @Query(() => Post)
  post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(@Arg("input") input: PostInput, @Ctx() { req }: MyContext): Promise<Post> {
    return Post.create({ ...input, creatorId: req.session.userId }).save();
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Ctx() { req }: MyContext,
  ): Promise<Post | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ title, text })
      .where('id = :id and "creatorId" = :creatorId', { id, creatorId: req.session.userId })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(@Arg("id", () => Int) id: number, @Ctx() { req }: MyContext): Promise<boolean> {
    // non-cascade way
    // const post = await Post.findOne(id);
    // if (!post) {
    //   return false;
    // }
    // if (post.creatorId !== req.session.userId) {
    //   throw new Error("user not authorized");
    // }
    // await Updoot.delete({ postId: id });
    // await Post.delete({ id });

    await Post.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
