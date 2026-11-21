import { createServer } from "node:http";
import { resolve, normalize, extname, sep } from "node:path";
import { stat, readFile } from "node:fs/promises";

const root = resolve(process.cwd(), "out");
const port = Number(process.env.QA_PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".gif": "image/gif", ".ico": "image/x-icon",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".mp4": "video/mp4",
};

async function findFile(pathname) {
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { return null; }
  const clean = normalize(decoded).replace(/^([/\\])+/, "");
  const direct = resolve(root, clean);
  if (direct !== root && !direct.startsWith(root + sep)) return null;
  const candidates = [direct, direct + ".html", resolve(direct, "index.html")];
  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
      if (info.isDirectory()) {
        const index = resolve(candidate, "index.html");
        const indexInfo = await stat(index);
        if (indexInfo.isFile()) return index;
      }
    } catch {}
  }
  return null;
}

const server = createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "content-type": "text/plain; charset=utf-8" });
    res.end("Method not allowed");
    return;
  }
  let pathname;
  try { pathname = new URL(req.url || "/", "http://localhost").pathname; }
  catch { pathname = "/"; }
  const file = await findFile(pathname);
  if (!file) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" });
    res.end("Not found: " + pathname);
    return;
  }
  const body = req.method === "HEAD" ? null : await readFile(file);
  res.writeHead(200, {
    "content-type": mime[extname(file).toLowerCase()] || "application/octet-stream",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  res.end(body);
});
server.listen(port, "127.0.0.1", () => {
  process.stdout.write("SAHEETRIX QA static server listening on " + port + "\n");
});
