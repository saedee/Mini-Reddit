import { Field, InputType } from "type-graphql";

@InputType()
export class usernamePasswordInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
