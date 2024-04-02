import "./clock-styles.css";

export function loadClockApp() {
  document.querySelector("#app").innerHTML = `
    <div id="clock" class="clock">
      <div class="hand hours"></div>
      <div class="hand minutes"></div>
      <div class="hand seconds"></div>
    </div>
  `;

  const clock = document.getElementById("clock");
  const nums = Array(12).fill(0);

  nums.forEach((_, idx) => {
    const num = idx + 1;
    const numberElement = document.createElement("div");
    numberElement.setAttribute("class", `number number${num}`);
    numberElement.innerHTML = num.toString();

    clock.appendChild(numberElement);
  });

  function updateClock() {
    const currentTime = new Date();
    const seconds = currentTime.getSeconds() / 60;
    const minutes = (seconds + currentTime.getMinutes()) / 60;
    const hours = (minutes + currentTime.getHours()) / 12;

    const secondsElement = document.querySelector(".seconds");
    const minutesElement = document.querySelector(".minutes");
    const hoursElement = document.querySelector(".hours");

    secondsElement.style.setProperty(
      "transform",
      `rotate(${seconds * 360}deg)`,
    );
    minutesElement.style.setProperty(
      "transform",
      `rotate(${minutes * 360}deg)`,
    );
    hoursElement.style.setProperty("transform", `rotate(${hours * 360}deg)`);
  }

  setInterval(updateClock, 100);

  updateClock();
}
