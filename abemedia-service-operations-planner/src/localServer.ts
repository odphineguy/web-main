import { createServer } from "node:http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createAbeMediaServer } from "./appServer.js";

const port = Number(process.env.PORT ?? 8787);
const mcpPath = process.env.MCP_PATH ?? "/mcp";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, mcp-session-id",
  "Access-Control-Expose-Headers": "Mcp-Session-Id",
};

const httpServer = createServer(async (req, res) => {
  if (!req.url) return res.writeHead(400).end("Missing URL");
  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);
  if (req.method === "GET" && url.pathname === "/") {
    return res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify({ name: "AbeMedia Service Operations AI Planner", mcp: mcpPath, status: "ok" }));
  }
  if (req.method === "OPTIONS" && url.pathname === mcpPath) return res.writeHead(204, corsHeaders).end();
  if (url.pathname !== mcpPath || !req.method || !new Set(["POST", "GET", "DELETE"]).has(req.method)) return res.writeHead(404).end("Not Found");
  Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value));
  const server = createAbeMediaServer();
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  res.on("close", () => { void transport.close(); void server.close(); });
  try {
    await server.connect(transport);
    await transport.handleRequest(req, res);
  } catch (error) {
    console.error("MCP request failed", error);
    if (!res.headersSent) res.writeHead(500).end("Internal server error");
  }
});

httpServer.listen(port, () => console.log(`AbeMedia Service Operations AI Planner listening on http://localhost:${port}${mcpPath}`));
