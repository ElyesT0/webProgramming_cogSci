"use strict";

/*
========= Practice 1 =========
*/

// Select elements
const button = document.getElementById("incrementBtn");
const countDisplay = document.getElementById("count");

let count = 0; // Initial count value

// Add event listener to button
button.addEventListener("click", () => {
  count++; // Increase counter
  countDisplay.textContent = count; // Update displayed count
});

/*
========= Practice 2 =========
*/
const resetBtn = document.getElementById("resetBtn");
// Reset button event listener
resetBtn.addEventListener("click", function () {
  count = 0; // Reset counter
  countDisplay.textContent = count; // Update display
});

/*
========= Supplementary code =========
*/
/* Handling Keyboard presses.
The following example uses the space bar. event.code for space bar is "Space"
To figure out the code of the key of your choice, look at the console. event codes are logged there
by the event listener.
*/
let spacebarCount = 0;
let last_key_pressed = "";
const space_bar_count = document.getElementById("spaceBarCount");

document.addEventListener("keydown", function (event) {
  last_key_pressed = event.code;

  if (last_key_pressed === "Space") {
    event.preventDefault(); // Prevents default scrolling behavior
    spacebarCount++;
    space_bar_count.textContent = `${spacebarCount} times`;
  } else {
    console.log(`${last_key_pressed} was pressed.`);
  }
});

my_element.addEventListener(type, listener);

const SOA = 400;

setTimeout(() => {
  console.log(`This message appears after ${SOA} ms.`);
}, SOA);
