import { Query, Resolver } from "type-graphql";

@Resolver()
export class ProjectResolver {
    @Query(() => String)
    getPost() {
        return 'return post1'
    }
}