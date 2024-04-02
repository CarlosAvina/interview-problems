import {
  loadSelectionToolApp,
  loadGridApp,
  loadClockApp,
  loadPolyfill,
  loadAutocomplete,
  loadPinkSquare,
} from "./apps";

document.querySelector("#menu").innerHTML = `
  <select>
    <option value="" selected disabled>Select an app</option>
    <option value="selection">Selection tool</option>
    <option value="clock">Reloj</option>
    <option value="grid">Grid</option>
    <option value="polyfill">Polyfill</option>
    <option value="autocomplete">Autocomplete</option>
    <option value="pink-square">Pink square</option>
  </select>
`;

const menu = document.querySelector("select");

function selectApp(event) {
  const value = event.currentTarget.value;

  switch (value) {
    case "selection":
      loadSelectionToolApp();
      break;
    case "clock":
      loadClockApp();
      break;
    case "grid":
      loadGridApp();
      break;
    case "polyfill":
      loadPolyfill();
      break;
    case "autocomplete":
      loadAutocomplete();
      break;
    case "pink-square":
      loadPinkSquare();
      break;
  }
}

menu.addEventListener("change", selectApp);
loadPinkSquare();
