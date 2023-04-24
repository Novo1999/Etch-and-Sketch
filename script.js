'use strict';

// Creating the grid dynamically
const etchPad = document.querySelector('.container');
// Selecting the grid slider
const input = document.querySelector('.slider');
// Select Black Button
const black = document.querySelector('.black');
// Selecting eraser
const eraser = document.querySelector('.erase');
// Selecting all buttons for indicating which button user has pressed
const indicate = document.querySelectorAll('.btn');
// Selecting chroma button
const chroma = document.querySelector('.chroma');
// Selecting reset button
const reset = document.querySelector('.reset');
// Selecting marker
const marker = document.querySelector('.marker');
// Selecting color slider
const slider = document.getElementById('color-slider');

// Clears the pad
function clearPad() {
  while (etchPad.firstChild) {
    etchPad.removeChild(etchPad.firstChild);
  }
}

// Grid Counter Selector

const gridCounter = document.querySelectorAll('.gridCounter');

function gridCount(count) {
  gridCounter.forEach(e => {
    e.textContent = count;
  });
}
gridCount(16);

// Creating the grid
function makeRows(rows, cols) {
  etchPad.style.setProperty('--grid-row', rows);
  etchPad.style.setProperty('--grid-col', cols);
  for (let i = 0; i < rows * cols; i++) {
    let cell = document.createElement('div');
    etchPad.appendChild(cell).id = 'grid-item';
  }
}
makeRows(16, 16);

// Create new grid
let inputInt = parseInt(input.value);
function createGrid(rows, cols) {
  clearPad();
  inputInt = parseInt(input.value);
  // console.log(inputInt);
  for (let i = 1; i <= 100; i++) {
    if (inputInt >= 1 && inputInt <= 100) {
      rows = inputInt;
      cols = inputInt;
    }
    makeRows(rows, cols);
    // Calling default mode after grid size changes
    gridItems = document.querySelectorAll('#grid-item');
    eraser.classList.remove('changeBG');
    chroma.classList.remove('changeBG');
    reset.classList.remove('changeBG');
    // console.log(nodes.childNodes);
    gridCount(rows);
    break;
  }
}

input.addEventListener('click', () => {
  createGrid();
  defaultMode();
});

// Selecting all child nodes
// Must be a live node
let gridItems = document.querySelectorAll('#grid-item');
const nodes = document.querySelector('.container');

function checkdivColor(e) {
  return e.style.backgroundColor === 'black';
}
function checkdivColor2(e) {
  return e.style.backgroundColor === 'white';
}

// Drawing Mode

function Mode(color) {
  gridItems.forEach(function (item) {
    item.addEventListener('mousemove', function (event) {
      if (event.buttons === 1 && !checkdivColor2(item)) {
        item.style.backgroundColor = color;
      } else if (event.buttons === 1 && !checkdivColor(item)) {
        item.style.backgroundColor = color;
      }
    });
  });
}

let colors = ['red', 'green', 'indigo', 'blue', 'orange', 'violet', 'yellow'];
function Polychromatic() {
  let currentColorIndex = 0;
  gridItems.forEach(function (e) {
    e.addEventListener('mousemove', function (event) {
      if (event.buttons === 1) {
        e.style.backgroundColor = colors[currentColorIndex];
        currentColorIndex = (currentColorIndex + 1) % colors.length;
      }
    });
  });
}

//Button Indicator

indicate.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    const styles = e.currentTarget.classList;
    if (styles.contains('black')) {
      Mode('black');
      styles.add('changeBG');
      eraser.classList.remove('changeBG');
      chroma.classList.remove('changeBG');
      reset.classList.remove('changeBG');
    } else if (styles.contains('chroma')) {
      Polychromatic();
      styles.add('changeBG');
      eraser.classList.remove('changeBG');
      black.classList.remove('changeBG');
      reset.classList.remove('changeBG');
    } else if (styles.contains('erase')) {
      Mode('white');
      styles.add('changeBG');
      black.classList.remove('changeBG');
      chroma.classList.remove('changeBG');
      reset.classList.remove('changeBG');
    } else {
      resetPad();
      chroma.classList.remove('changeBG');
      eraser.classList.remove('changeBG');
    }
  });
});

// Making the Default mode to black
function defaultMode() {
  gridItems.forEach(function (item) {
    item.addEventListener('mousemove', e => {
      e.preventDefault();
      if (e.buttons === 1 && !checkdivColor(item)) {
        item.style.backgroundColor = 'black';
      }
    });
    black.classList.add('changeBG');
  });
}
defaultMode();
// Reset
function resetPad() {
  clearPad();
  createGrid();
  gridCount(inputInt);
  defaultMode();
}

// Color Picker
const colorCtx2 = slider.getContext('2d');
const colorCanvas = document.getElementById('color-canvas');
const colorCtx = colorCanvas.getContext('2d');
let gradientV = colorCtx.createLinearGradient(0, 0, 0, 300);
let gradientH = colorCtx.createLinearGradient(0, 0, colorCtx.canvas.width, 0);
let color = 'blue';

function colorPicker() {
  // Vertical Gradient
  gradientV.addColorStop(0, 'rgba(0,0,0,0');
  gradientV.addColorStop(1, '#000');
  colorCtx.fillStyle = gradientV;
  // Draws to the canvas
  colorCtx.fillRect(0, 15, colorCtx.canvas.width, colorCtx.canvas.height);
  // Horizontal Gradient
  gradientH.addColorStop(0, '#fff');
  gradientH.addColorStop(1, color);
  colorCtx.fillStyle = gradientH;
  // Draws to the canvas
  colorCtx.fillRect(0, 0, colorCtx.canvas.width, colorCtx.canvas.height);
}
colorPicker();
// Selecting color from color picker

function colorMode(e) {
  let rect = colorCanvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  // console.log(x);
  let pixel = colorCtx.getImageData(x, y, 1, 1)['data'];
  // console.log(pixel);
  let rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
  // console.log(rgb);
  gridItems = document.querySelectorAll('#grid-item');
  gridItems.forEach(function (item) {
    item.addEventListener('mousemove', e => {
      e.preventDefault();
      if (e.buttons === 1) {
        item.style.backgroundColor = rgb;
      }
    });
  });
}

colorCanvas.addEventListener('mousemove', function (e) {
  if (e.buttons === 1) {
    black.classList.remove('changeBG');
    colorMode(e);
  }
});

// function markerMove() {
//   gridItems.forEach(function (item) {
//     item.addEventListener('mousemove', e => {
//       // e.preventDefault();
//       let itemRect = item.getBoundingClientRect();
//       if (e.buttons === 1) {
//         let offsetX = e.clientX - itemRect.left;
//         let offsetY = e.clientY - itemRect.top;
//         console.log(offsetX);
//         marker.style.left = `${offsetX}px`;
//         marker.style.top = `${offsetY}px`;
//       }
//     });
//   });
// }

// Side Menu
// Slider for the grids
// Color Mode - Polychromatic
// Eraser
// Sketchpad Clear
