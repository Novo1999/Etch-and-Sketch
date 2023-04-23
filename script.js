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
let rows = 0;
let cols = 0;
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
input.addEventListener('click', (rows, cols) => {
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
    // Calling black again after nodelist updates
    blackMode();
    // console.log(nodes.childNodes);
    gridCount(rows);
    break;
  }
});

// Selecting all child nodes
// Must be a live node
const nodes = document.querySelector('.container');
let gridItems = document.querySelectorAll('#grid-item');
// console.log(nodes.childNodes);

// Black Color Mode
function blackMode() {
  black.addEventListener('click', function () {
    gridItems.forEach(function (item) {
      item.addEventListener('mousemove', function change(event) {
        if (event.buttons === 1 && !checkdivColor(item)) {
          console.log(event.target);
          item.style.backgroundColor = 'black';
        }
      });
    });
  });
}
blackMode();

function checkdivColor(e) {
  console.log(e.style.backgroundColor === 'black');
  return e.style.backgroundColor === 'black';
}

// Eraser
function eraserMode() {
  eraser.addEventListener('click', function () {
    gridItems.forEach(function (item) {
      item.addEventListener('mousemove', function change() {
        item.style.backgroundColor = 'white';
      });
    });
  });
}
eraserMode();

//Button Indicator

indicate.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    const styles = e.currentTarget.classList;
    console.log(styles);
    if (styles.contains('black')) {
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
      styles.add('changeBG');
      black.classList.remove('changeBG');
      chroma.classList.remove('changeBG');
      reset.classList.remove('changeBG');
    } else {
      styles.add('changeBG');
      black.classList.remove('changeBG');
      chroma.classList.remove('changeBG');
      eraser.classList.remove('changeBG');
    }
  });
});

// Side Menu
// Slider for the grids
// Color Mode - Polychromatic
// Eraser
// Sketchpad Clear
