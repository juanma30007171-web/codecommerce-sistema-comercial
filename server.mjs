// Servidor estático de cero dependencias para preview local / QA.
// Producción se despliega como archivos estáticos (Netlify, Vercel, Cloudflare Pages, etc.).
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const PORT = process.env.PORT || 4322;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".mp4": "video/mp4"
};

// Video necesita soporte de Range (206 Partial Content) para que el navegador
// pueda buscar/adelantar sin descargar el archivo completo primero.
const server = createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(new URL(req.url, `http://localhost`).pathname);
    if (urlPath === "/") urlPath = "/index.html";
    let filePath = normalize(join(ROOT, urlPath));
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    let info;
    try {
      info = await stat(filePath);
    } catch {
      filePath = join(ROOT, "index.html");
      info = await stat(filePath);
    }
    if (info.isDirectory()) {
      filePath = join(filePath, "index.html");
      info = await stat(filePath);
    }

    const type = MIME[extname(filePath)] || "application/octet-stream";
    const range = req.headers.range;

    if (range) {
      const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
      const start = parseInt(startStr, 10);
      const end = endStr ? parseInt(endStr, 10) : info.size - 1;
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${info.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Content-Type": type,
        "Cache-Control": "no-cache"
      });
      createReadStream(filePath, { start, end }).pipe(res);
      return;
    }

    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": type, "Accept-Ranges": "bytes", "Cache-Control": "no-cache" });
    res.end(data);
  } catch (err) {
    res.writeHead(500).end("Server error: " + err.message);
  }
});

server.listen(PORT, () => {
  console.log(`Sistema Comercial Autogestionable — preview en http://localhost:${PORT}`);
});
