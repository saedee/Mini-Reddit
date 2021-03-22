import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Project } from "./entities/Project";
import microConfig from './mikro-orm.config'

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up()
    
    // const project = orm.em.create(Project, {title: 'my first project'});
    // await orm.em.persistAndFlush(project);

    const project = await orm.em.find(Project, {});
    console.log(project)
};

main().catch((err) => {
    console.log(err)
});