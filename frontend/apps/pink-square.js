import "./pink-square.css";

export function loadPinkSquare() {
  document.getElementById("app").innerHTML = `
    <div class="controls">
      <div></div>
      <button id="top"></button>
      <div></div>
      <button id='left'></button>
      <div class="field">
        <div id="pink" class="pink"></div>
      </div>
      <button id="right"></button>
      <div></div>
      <button id="bottom"></button>
    </div>
  `;

  const STEP = 5;
  const topButton = document.getElementById("top");
  const leftButton = document.getElementById("left");
  const rightButton = document.getElementById("right");
  const bottomButton = document.getElementById("bottom");
  const pinkBox = document.getElementById("pink");

  function checkCollition(direction, currentButton) {
    const { top, left, right, bottom } = pinkBox.getBoundingClientRect();
    const buttonBounds = currentButton.getBoundingClientRect();

    switch (direction) {
      case "up":
        return top - STEP > buttonBounds.bottom;
      case "left":
        return left - STEP > buttonBounds.right;
      case "right":
        return right + STEP < buttonBounds.left;
      case "down":
        return bottom + STEP < buttonBounds.top;
    }

    return false;
  }

  function moveBox(direction) {
    const { top, left } = pinkBox.getBoundingClientRect();
    switch (direction) {
      case "up": {
        const newTop = top - STEP;
        pinkBox.style.setProperty("top", `${newTop}px`);
        break;
      }
      case "left": {
        const newLeft = left - STEP;
        pinkBox.style.setProperty("left", `${newLeft}px`);
        break;
      }
      case "right": {
        const newLeft = left + STEP;
        pinkBox.style.setProperty("left", `${newLeft}px`);
        break;
      }
      case "down": {
        const newTop = top + STEP;
        pinkBox.style.setProperty("top", `${newTop}px`);
        break;
      }
    }
  }

  function moveUp(event) {
    const currentButton = event.currentTarget;
    const shouldMove = checkCollition("up", currentButton);

    if (shouldMove) {
      moveBox("up");
    }
  }

  function moveLeft(event) {
    const currentButton = event.currentTarget;
    const shouldMove = checkCollition("left", currentButton);

    if (shouldMove) {
      moveBox("left");
    }
  }

  function moveRight(event) {
    const currentButton = event.currentTarget;
    const shouldMove = checkCollition("right", currentButton);

    if (shouldMove) {
      moveBox("right");
    }
  }

  function moveBottom(event) {
    const currentButton = event.currentTarget;
    const shouldMove = checkCollition("down", currentButton);

    if (shouldMove) {
      moveBox("down");
    }
  }

  topButton.addEventListener("click", moveUp);
  leftButton.addEventListener("click", moveLeft);
  rightButton.addEventListener("click", moveRight);
  bottomButton.addEventListener("click", moveBottom);
}
