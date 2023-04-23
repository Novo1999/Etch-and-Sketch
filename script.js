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
// Clears the pad
function clearPad() {
  while (etchPad.firstChild) {
    etchPad.removeChild(etchPad.firstChild);
  }
}

// Grid Counter Selector

const gridCounter = document.querySelectorAll('.gridCounter');

gridCount(16);
function gridCount(count) {
  gridCounter.forEach(e => {
    e.textContent = count;
  });
}

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
function createGrid(rows, cols) {
  clearPad();
  let inputInt = parseInt(input.value);
  // console.log(inputInt);
  for (let i = 1; i <= 100; i++) {
    if (inputInt >= 1 && inputInt <= 100) {
      rows = inputInt;
      cols = inputInt;
    }
    makeRows(rows, cols);
    gridItems = document.querySelectorAll('#grid-item');
    // Calling default mode after grid size changes
    defaultMode();
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
});

// Selecting all child nodes
// Must be a live node
const nodes = document.querySelector('.container');
let gridItems = document.querySelectorAll('#grid-item');
// console.log(nodes.childNodes);

// Black Color Mode

// function blackMode() {
//   gridItems.forEach(function (item) {
//     item.addEventListener('mousedown', function change(event) {
//       if (event.buttons === 1 && !checkdivColor(item)) {
//         item.style.backgroundColor = 'black';
//       }
//     });
//   });
// }

function checkdivColor(e) {
  return e.style.backgroundColor === 'black';
}
function checkdivColor2(e) {
  return e.style.backgroundColor === 'white';
}
// Eraser

function Mode() {
  gridItems.forEach(function (item) {
    item.addEventListener('mousemove', function change(event) {
      if (event.buttons === 1 && !checkdivColor2(item)) {
        item.style.backgroundColor = 'white';
      } else if (event.buttons === 1 && !checkdivColor(item)) {
        item.style.backgroundColor = 'black';
      }
    });
  });
}
// Reset
function resetPad() {
  gridCount(16);
  clearPad();
  makeRows(16, 16);
  defaultMode();
}
//Button Indicator

indicate.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    const styles = e.currentTarget.classList;
    if (styles.contains('black')) {
      Mode();
      styles.add('changeBG');
      eraser.classList.remove('changeBG');
      chroma.classList.remove('changeBG');
      reset.classList.remove('changeBG');
    } else if (styles.contains('chroma')) {
      styles.add('changeBG');
      eraser.classList.remove('changeBG');
      black.classList.remove('changeBG');
      reset.classList.remove('changeBG');
    } else if (styles.contains('erase')) {
      Mode();
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
    item.addEventListener('mousemove', function change(event) {
      if (event.buttons === 1 && !checkdivColor(item)) {
        item.style.backgroundColor = 'black';
      }
    });
    black.classList.add('changeBG');
  });
}
defaultMode();

// Side Menu
// Slider for the grids
// Color Mode - Polychromatic
// Eraser
// Sketchpad Clear
