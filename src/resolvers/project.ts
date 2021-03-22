import { Project } from "../entities/Project";
import { Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "../types"

@Resolver()
export class ProjectResolver {
    @Query(() => [Project])
    projects(@Ctx() { em }: MyContext): Promise<Project[]> {
        return em.find(Project, {});
    }
}