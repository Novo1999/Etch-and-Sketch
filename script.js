"use strict";

// Creating the grid dynamically
const container = document.querySelector(".container");

function makeRows(rows, cols) {
  container.style.setProperty("--grid-row", rows);
  container.style.setProperty("--grid-col", cols);
  for (let i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    // cell.innerText = i + 1;
    container.appendChild(cell).className = "grid-item";
  }
}

makeRows(16, 16);
