import { Project } from "../entities/Project";
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types"

@InputType()
class ProjectInput {
    @Field()
    title: string;
    @Field()
    text: string;
}

@Resolver()
export class ProjectResolver {
    @Query(() => [Project])
    projects(@Ctx() { em }: MyContext
    ): Promise<Project[]> {
        return em.find(Project, {});
    }

    @Query(() => Project)
    project(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<Project | null > {
        return em.findOne(Project, { id });
    }

    @Mutation(() => Project)
    async addProject(
        @Arg('options') options: ProjectInput,
        @Ctx() { em }: MyContext
    ): Promise<Project | null> {
        const project = em.create(Project, {
            title: options.title, 
            text: options.text
        });
        await em.persistAndFlush(project);
        return project;
    }

    @Mutation(() => Project, {nullable: true})
    async updateProject(
        @Arg('id', () => Int) id: number,
        @Arg('options') options: ProjectInput,
        @Ctx() { em }: MyContext
    ): Promise<Project | null> {
        const project = await em.findOne(Project, {id});
        if (!project) {
            return null;
        }
        project.title = options.title;
        project.text = options.text;
        await em.persistAndFlush(project);
        return project;
    }

    @Mutation(() => Boolean)
    async deleteProject(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        em.nativeDelete(Project, {id});
        return true
    }
}