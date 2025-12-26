// /apps/pattern-review-ui/src/decision-server.js
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const decisionsPath = path.join(process.cwd(), "pattern-decisions.json");

function appendDecision(decision) {
  let decisions = [];
  if (fs.existsSync(decisionsPath)) {
    decisions = JSON.parse(fs.readFileSync(decisionsPath, "utf8"));
  }
  decisions.push({ ...decision, at: new Date().toISOString() });
  fs.writeFileSync(decisionsPath, JSON.stringify(decisions, null, 2), "utf8");
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/pattern-decision") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const decision = JSON.parse(body);
        appendDecision(decision);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: false, error: "Not found" }));
  }
});

server.listen(9090, () => {
  console.log("Decision server listening on 9090");
});
