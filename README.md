<p style='position: relative;' align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  <!-- From https://nestjs.com/ -->
  <img src='./src/assets/cat.png'/>
</p>

## Description

A template for creating a server-side application using [Nest](https://github.com/nestjs/nest) and TypeScript.

A simple application that allows you to create, read, update and delete users.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# hmr mode
$ pnpm run start:hmr
$ pnpm run start:webpack

# production mode
$ pnpm run start:prod
```

## Change db

```bash
# db generate
$ pnpm run db:generate

# db migration
$ pnpm run db:migrate

# db push
$ pnpm run db:push

# db pull
$ pnpm run db:pull
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Dependencies

- [Nest](https://github.com/nestjs/nest) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [Typescript](https://www.typescriptlang.org/) - TypeScript is a language for application-scale JavaScript.
- [Zod](https://zod.dev/) - TypeScript-first schema validation with static type inference
- [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM.
- [Dayj.s](https://day.js.org/) - Fast 2kB alternative to Moment.js with the same modern API
- [RxJS](https://rxjs.dev/) - A reactive programming library for JavaScript
- [CORS](https://github.com/expressjs/cors) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [CryptoJS](https://cryptojs.gitbook.io/docs/) - JavaScript implementations of standard and secure cryptographic algorithms
- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express) - Adds middleware to your express app to serve the Swagger UI bound to your Swagger document.
- [Webpack](https://webpack.js.org/) - webpack is a static module bundler for modern JavaScript applications.
- [Jest](https://jestjs.io/) - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [Eslint](https://eslint.org/) - Find and fix problems in your JavaScript code
- [Prettier](https://prettier.io/) - Prettier is an opinionated code formatter

## License

Nest is [MIT licensed](LICENSE).
