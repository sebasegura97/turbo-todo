
# Todo App

## Stack

**Frontend:** React and Next.js with typescript, tailwindcss as css framework, framer motion for animations and jest for unit testing. Deployed on vercel.

****Backend:**** Firebase.

**CI/CD:** Github actions


## Features
The app is built with the intention of pass out the technical interview, so it has all the requested functionalities and the bonus:
1. Responsive
2. Interactive (hover state on interactive elements)
3. CRUD features
4. Filter features
5. Cloud server
6. Light / dark mode
7. Drag and drop to reorder

Some extra features:
1. Share a link with your todo list.
2. Real time collaborative updates.

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app currently unused
- `web`: another [Next.js](https://nextjs.org/) app with our todo app code
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```

To develop the todo app, run the following command:

```
pnpm -F web dev
```



## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
