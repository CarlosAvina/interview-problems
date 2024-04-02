import "./style.css";

export function loadSelectionToolApp() {
  document.querySelector("#app").innerHTML = `
  <div>
    <div id="grid" class="grid"></div>
    <div id="selection" style="position: absolute; border: 1px solid red;"></div>
  </div>
`;

  // create grid
  const cells = new Array(16).fill(0);
  const grid = document.getElementById("grid");
  cells.forEach(() => {
    const cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    grid.appendChild(cell);
  });

  let initialX = 0;
  let initialY = 0;
  let isSelecting = false;
  const selection = document.getElementById("selection");

  function onMouseDown(event) {
    isSelecting = true;
    initialX = event.clientX;
    initialY = event.clientY;

    selection.style.setProperty("top", `${initialY}px`);
    selection.style.setProperty("left", `${initialX}px`);
  }

  function onMouseMove(event) {
    if (!isSelecting) return;

    paintSelection();

    const finalX = event.clientX;
    const finalY = event.clientY;

    let width;
    let height;
    if (finalX > initialX) {
      width = finalX - initialX;
    } else {
      width = initialX - finalX;
      selection.style.setProperty("left", `${finalX}px`);
    }

    if (finalY > initialY) {
      height = finalY - initialY;
    } else {
      height = initialY - finalY;
      selection.style.setProperty("top", `${finalY}px`);
    }

    selection.style.setProperty("width", `${width}px`);
    selection.style.setProperty("height", `${height}px`);
  }

  function onMouseUp() {
    isSelecting = false;
    selection.style.setProperty("width", 0);
    selection.style.setProperty("height", 0);
  }

  function paintSelection() {
    const children = Array.from(grid.children);
    children.forEach((child) => {
      const { top, bottom, left, right } = child.getBoundingClientRect();
      const {
        top: selTop,
        bottom: selBottom,
        left: selLeft,
        right: selRight,
      } = selection.getBoundingClientRect();

      if (
        selTop < bottom &&
        selBottom > top &&
        selLeft < right &&
        selRight > left
      ) {
        child.style.setProperty("background-color", "blue");
      } else {
        child.style.setProperty("background-color", "white");
      }
    });
  }

  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}
