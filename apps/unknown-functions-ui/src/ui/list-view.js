// /apps/unknown-functions-ui/src/ui/list-view.js
export function renderListView(root, unknownFunctions, onSelect) {
  root.innerHTML = "";
  const container = document.createElement("div");

  const title = document.createElement("h1");
  title.textContent = "Unknown Augmented Functions";

  const list = document.createElement("ul");
  unknownFunctions.forEach((uf) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = `${uf.label} [${uf.riskLevel}]`;
    btn.onclick = () => onSelect(uf.id);
    li.appendChild(btn);
    list.appendChild(li);
  });

  container.appendChild(title);
  container.appendChild(list);
  root.appendChild(container);
}
