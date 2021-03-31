import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

// join table results of user and post
@ObjectType()
@Entity()
export class Updoot extends BaseEntity {
  @Field()
  @Column({ type: "int" })
  value: number;

  @Field()
  @PrimaryColumn()
  userId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.updoots)
  user: User;

  @Field()
  @PrimaryColumn()
  postId: Number;

  @Field()
  @ManyToOne(() => Post, (post) => post.updoots)
  post: Post;
}
