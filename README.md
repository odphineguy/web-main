# Abe Media website

This repository contains the public Abe Media website and its ChatGPT plugin.

## What lives here

- **Website** — the main Next.js project in this repository. It powers [abemedia.online](https://abemedia.online).
- **ChatGPT plugin** — the separate project in [`abemedia-chatgpt-plugin`](./abemedia-chatgpt-plugin). It helps service-business owners assess missed calls, plan intake and escalation workflows, view sample agent calls, and request an Abe Media follow-up.

See [`PROJECTS.md`](./PROJECTS.md) for the deployment and ownership map.

## Website development

```bash
npm install
npm run dev
```

Before shipping website changes:

```bash
npm run lint
npm run build
```

The website deploys from the repository root. The ChatGPT plugin has its own dependencies, tests, and Vercel project.
