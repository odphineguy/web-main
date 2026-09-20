# Project map

## Abe Media website

- **What it is:** the public marketing website and lead-capture experience.
- **Folder:** repository root.
- **Public address:** [abemedia.online](https://abemedia.online)
- **Technology:** Next.js, React, Convex, and Resend.
- **Deploy:** the root Vercel project deploys from `main`.

## Abe Media ChatGPT Plugin

- **What it is:** a ChatGPT-connected assistant for service-business call coverage, missed-call estimates, intake playbooks, sample calls, and Abe Media follow-up requests.
- **Folder:** [`abemedia-chatgpt-plugin`](./abemedia-chatgpt-plugin)
- **Public connection:** the plugin's HTTPS `/mcp` endpoint on its separate Vercel project.
- **Technology:** Model Context Protocol (MCP), the OpenAI Apps SDK UI format, TypeScript, Convex lead storage, and Resend email delivery.
- **Deploy:** run `npm run deploy` inside the plugin folder.

The Vercel project may still display the older technical project name `abemedia-service-operations-planner`. That name is retained only to preserve the existing deployment address. The product shown to people is **Abe Media ChatGPT Plugin**.

## Shared boundary

The website and plugin are separate deployable projects, but the plugin intentionally sends approved follow-up requests into the website's existing Convex consultation table and Abe Media email inbox. The homepage file `public/hero-web.mp4` is the website's multi-project hero reel and is not owned by the plugin.
