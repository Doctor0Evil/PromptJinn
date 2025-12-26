// /apps/unknown-functions-ui/src/main.js
import { fetchUnknownFunctions, fetchReport } from "./api/mock-backend.js";
import { renderListView } from "./ui/list-view.js";
import { renderDetailView } from "./ui/detail-view.js";

async function start() {
  const app = document.getElementById("app");
  const unknownFunctions = await fetchUnknownFunctions();

  renderListView(app, unknownFunctions, async (selectedId) => {
    const report = await fetchReport(selectedId);
    renderDetailView(app, report);
  });
}

start().catch((err) => {
  console.error(err);
});
