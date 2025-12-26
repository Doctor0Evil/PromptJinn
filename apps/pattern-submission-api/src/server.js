// /apps/pattern-submission-api/src/server.js
import http from "node:http";
import { validatePatternProposal } from "./validators/pattern.validator.js";
import { appendPendingPattern } from "./services/file-store.js";

const PORT = process.env.PORT || 8080;

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/patterns/propose") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const payload = JSON.parse(body);
        const { valid, errors } = validatePatternProposal(payload);

        if (!valid) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: false, errors }));
          return;
        }

        appendPendingPattern(payload);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, id: payload.id }));
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: false, error: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Pattern submission API listening on ${PORT}`);
});
