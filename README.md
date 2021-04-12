# [Mini-Reddit!](https://www.codedevr.com)

### this is a fullstack project that I built in an attempt to learn and familiarise myself with the tech stack for a fullstack web. this project is followed from ben awad's fullstack react with graphql tutorial.

---

### technologies involved

#### backend/server

- postgresql (database)
- node.js express (server side development)
- nodemailer (handles email sending)
- [redis](https://redis.io/) (in memory datastore)
- [graphql](https://graphql.org/) (query langague)
- [typeORM](https://typeorm.io/) (typescript ORM)
- [typegraphql](https://typegraphql.com/) (framework for graphql api in node.js)
- [apollo server](https://www.apollographql.com/docs/apollo-server/) (graphql server)

#### frontend/web

- react
- typescript
- next.js with chakra (urql has next.js integration for SSR)
- [codegen](https://www.graphql-code-generator.com/) (graphql code generator)
- [apollo client](https://www.apollographql.com/docs/react/) (graphql react client)

#### deployment

- [docker](https://docs.docker.com/)
- backend deployed at [digitalocean dokku](https://auth0.com/blog/hosting-applications-using-digitalocean-and-dokku/)
- frontend deployed at [vercel](https://vercel.com/)

#### concepts

- server side rendering
- session authentication
- pagination (with offset + cursor)

#### extra notes

- tried out [mikroORM](https://mikro-orm.io/) and replaced it with typeORM
- tried out [urql](https://formidable.com/open-source/urql/) and replaced it with apollo client

---

this project encapsulates multiple frameworks and concepts, which i will try to explain in my concept.txt as best as i can - at least the ones i find interesting and important to know when doing a fullstack application.
