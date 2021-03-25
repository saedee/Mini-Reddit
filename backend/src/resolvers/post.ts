import { Post } from "../entities/Post";
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";

@InputType()
class ProjectInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post)
  post(@Arg("id", () => Int) id: number, @Ctx() { em }: MyContext): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async addPost(
    @Arg("options") options: ProjectInput,
    @Ctx() { em }: MyContext,
  ): Promise<Post | null> {
    const post = em.create(Post, {
      title: options.title,
      text: options.text,
    });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("options") options: ProjectInput,
    @Ctx() { em }: MyContext,
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }
    post.title = options.title;
    post.text = options.text;
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id", () => Int) id: number, @Ctx() { em }: MyContext): Promise<boolean> {
    em.nativeDelete(Post, { id });
    return true;
  }
}
