import "./style.css";

export function loadGridApp() {
  const GRID_WIDTH = 12;

  document.querySelector("#app").innerHTML = `
     <div id="grid" class="grid-2"></div>
  `;

  const grid = document.getElementById("grid");
  grid.style.setProperty("grid-template-columns", `repeat(${GRID_WIDTH}, 1fr)`);
  grid.style.setProperty("grid-template-rows", `repeat(${GRID_WIDTH}, 1fr)`);

  const player = document.createElement("div");
  player.setAttribute("class", "player");

  const cells = Array(GRID_WIDTH * GRID_WIDTH).fill(0);

  cells.forEach((_, idx) => {
    const node = document.createElement("div");
    node.setAttribute("class", "cell");
    node.setAttribute("id", `${idx}`);

    if (idx === 0) {
      node.appendChild(player);
    }

    grid.appendChild(node);
  });

  function getNextCellId(parentId, key) {
    let newCellId = parentId;
    switch (key) {
      case "ArrowUp":
        if (parentId - GRID_WIDTH >= 0) {
          newCellId = parentId - GRID_WIDTH;
        }
        break;
      case "ArrowDown":
        if (parentId + GRID_WIDTH < GRID_WIDTH * GRID_WIDTH) {
          newCellId = parentId + GRID_WIDTH;
        }
        break;
      case "ArrowLeft":
        const downDec = Math.floor(parentId / GRID_WIDTH) * GRID_WIDTH;
        if (parentId - 1 >= downDec) {
          newCellId = parentId - 1;
        }
        break;
      case "ArrowRight":
        const upDec =
          Math.floor((parentId + GRID_WIDTH) / GRID_WIDTH) * GRID_WIDTH;
        if (parentId + 1 < upDec) {
          newCellId = parentId + 1;
        }
        break;
    }
    return newCellId;
  }

  document.addEventListener("keydown", (event) => {
    const key = event.key;

    const parentId = parseInt(player.parentElement.id);
    const nextId = getNextCellId(parentId, key);

    document.getElementById(nextId).appendChild(player);
  });
}
