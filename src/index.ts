import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Project } from "./entities/Project";

const main = async () => {
    const orm = await MikroORM.init({
        entities: [Project],
        dbName: 'react',
        type: 'postgresql',
        debug: !__prod__
    });

    const project = orm.em.create(Project, {title: 'my first project'});
    await orm.em.persistAndFlush(project);
};

main().catch((err) => {
    console.log(err)
});