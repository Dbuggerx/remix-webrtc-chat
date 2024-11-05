**Please leave a star if you like it!**

# Remix WebRTC Chat

Welcome to the Remix WebRTC Chat project!
This application uses Remix for routing and managing state, React for creating interactive UIs, WebRTC with PeerJS for peer-to-peer communication, and TailwindCSS with Radix-UI for styling and UI components. TypeScript provides static types for safer and more robust development, and Pnpm is used for package management.
**It's a work in progress**.

## Technologies

- Remix: a modern framework for building better websites. It provides a great developer experience with features like automatic routing, server components, and more.
- React: a popular JavaScript library for building user interfaces, especially single-page applications.
- WebRTC (PeerJS): PeerJS simplifies WebRTC peer-to-peer data, video, and audio calls. It abstracts away much of the underlying complexity and lets you focus on writing powerful, feature-rich apps.
- Shadcn (TailwindCSS, Radix-UI): Shadcn combines the utility-first styling of TailwindCSS with the accessibility-focused primitives of Radix-UI. It provides a robust set of tools for building custom designs with ease.
- Pnpm: a fast, disk space efficient package manager for JavaScript.
- Tests done with [TestCafe](https://devexpress.github.io/testcafe/documentation/getting-started/) and the [Testing-Library](https://testing-library.com/docs/testcafe-testing-library/intro).

## Features

- Real-time P2P messaging with WebRTC.
- Responsive user interface styled with TailwindCSS and Radix-UI.
- Dark mode.
- Built with Remix and React.

---

# Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js](https://nodejs.org/).
- You have installed the latest version of [Pnpm](https://pnpm.io/).

# Getting Started

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
pnpm run dev
```

This starts the app in development mode, rebuilding assets on file changes.

## Deployment

First, build the app for production:

```sh
pnpm run build
```

Then run the app in production mode:

```sh
pnpm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
