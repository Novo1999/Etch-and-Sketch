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
/// Selecting Color Picker
const colorPicker = document.querySelector('#picker');
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
    reset.classList.remove('changeBG');
    // console.log(nodes.childNodes);
    gridCount(rows);
    break;
  }
}

input.addEventListener('click', () => {
  if (black.classList.contains('changeBG')) {
    createGrid();
    Mode('black');
  } else if (chroma.classList.contains('changeBG')) {
    createGrid();
    Polychromatic();
  } else if (colorPicker.classList.contains('changeBG')) {
    createGrid();
    defaultMode();
  }
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
        event.preventDefault();
        item.style.backgroundColor = color;
      } else if (event.buttons === 1 && !checkdivColor(item)) {
        event.preventDefault();
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
      event.preventDefault();
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
      colorPicker.classList.remove('changeBG');
    } else if (styles.contains('chroma')) {
      Polychromatic();
      styles.add('changeBG');
      eraser.classList.remove('changeBG');
      black.classList.remove('changeBG');
      reset.classList.remove('changeBG');
      colorPicker.classList.remove('changeBG');
    } else if (styles.contains('erase')) {
      Mode('white');
      styles.add('changeBG');
      black.classList.remove('changeBG');
      chroma.classList.remove('changeBG');
      reset.classList.remove('changeBG');
      colorPicker.classList.remove('changeBG');
    } else if (styles.contains('reset')) {
      resetPad();
      chroma.classList.remove('changeBG');
      eraser.classList.remove('changeBG');
      colorPicker.classList.remove('changeBG');
    } else {
      update();
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
    colorPicker.classList.remove('changeBG');
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
const defaultColor = '#E32E2E';
window.addEventListener('load', startup, false);

function startup() {
  colorPicker.value = defaultColor;
  colorPicker.addEventListener('input', updateFirst, false);
  colorPicker.addEventListener('change', colorPick, false);
  colorPicker.select();
}
function updateFirst() {
  if (colorPicker) {
    colorPicker.classList.add('changeBG');
    chroma.classList.remove('changeBG');
    eraser.classList.remove('changeBG');
    black.classList.remove('changeBG');
  }
}
const colorPick = function update(e) {
  gridItems.forEach(item => {
    item.addEventListener('mousemove', function (event) {
      if (event.buttons === 1 && !checkdivColor2(item)) {
        event.preventDefault();
        item.style.backgroundColor = e.target.value;
      }
    });
  });
};
// Side Menu
// Slider for the grids
// Color Mode - Polychromatic
// Eraser
// Sketchpad Clear
