"use strict";

// Creating the grid dynamically
const etchPad = document.querySelector(".container");
// Selecting
const input = document.querySelector(".slider");
// Clears the pad
function clearPad() {
  while (etchPad.firstChild) {
    etchPad.removeChild(etchPad.firstChild);
  }
}

// Grid Counter Selector

const gridCounter = document.querySelectorAll(".gridCounter");

gridCount(16);

function gridCount(count) {
  gridCounter.forEach((e) => {
    e.textContent = count;
  });
}

function makeRows(rows, cols) {
  etchPad.style.setProperty("--grid-row", rows);
  etchPad.style.setProperty("--grid-col", cols);
  for (let i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    etchPad.appendChild(cell).id = "grid-item";
  }
}
makeRows(16, 16);

input.addEventListener("click", (rows, cols) => {
  clearPad();
  let inputInt = parseInt(input.value);
  console.log(inputInt);
  for (let i = 1; i <= 100; i++) {
    if (inputInt >= 1 && inputInt <= 100) {
      rows = inputInt;
      cols = inputInt;
    }
    makeRows(rows, cols);
    gridCount(rows);
    break;
  }
});
// Side Menu
// Slider for the grids
// Color Mode - Polychromatic
// Eraser
// Sketchpad Clear
