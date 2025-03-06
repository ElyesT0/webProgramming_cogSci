"use strict";
// SUB-PART
// Given Code
/* ********************************
------------ Base Data ------------ 
******************************** */

const words_set = ["red", "green", "blue", "yellow"];
const colors_set = [
  // HEX Color format
  "c1121f", // red
  "a1c181", // green
  "118ab2", // blue
  "ffd60a", // yellow
];

const font_size = 50;

// --- Counters for experiment timeline
let counter_trial = 0;

// --- Measurements for Styling

// Define canvas size with margins
const canvas_margin_y = 50;
const canvas_margin_x = 10;

// SUB-PART
// Start of Practice
/* ********************************
---------- DOM Variables ---------- 
******************************** */

// ---- Practice 1

const canvas = document.querySelector(".canvas");
const btn_start = document.querySelector(".btn-start");
const container_word = document.querySelector(".container-word");
const container_btns = document.querySelector(".container-btns");
const fixation = document.querySelector(".fixation");

// Buttons
const btn_red = document.querySelector(".btn-red");
const btn_blue = document.querySelector(".btn-blue");
const btn_green = document.querySelector(".btn-green");
const btn_yellow = document.querySelector(".btn-yellow");

let screen_height = window.innerHeight;
let screen_width = window.innerWidth;

let canvas_height = screen_height - 2 * canvas_margin_y;
let canvas_width = screen_width - 2 * canvas_margin_x;

const container_word_width = container_word.offsetWidth;
const container_word_height = container_word.offsetHeight;

console.log(
  `Container word width is ${container_word_width} px, and height is ${container_word_height}`
);

/* ********************************
------------ Styling ---------- 
******************************** */

function create_canvas() {
  // Get screen dimensions
  var screen_height = window.innerHeight;
  var screen_width = window.innerWidth;

  // Define canvas size with margins
  const canvas_margin_y = 50;
  const canvas_margin_x = 10;
  var canvas_height = screen_height - 2 * canvas_margin_y;
  var canvas_width = screen_width - 2 * canvas_margin_x;

  // Apply canvas dimensions and margins
  canvas.style.height = `${canvas_height}px`;
  canvas.style.width = `${canvas_width}px`;
  canvas.style.margin = `${canvas_margin_y}px ${canvas_margin_x}px`;

  // Center the word container
  const container_word_width = container_word.offsetWidth;
  const container_word_height = container_word.offsetHeight;
  container_word.style.left = `${(canvas_width - container_word_width) / 2}px`;
  container_word.style.top = `${(canvas_height - container_word_height) / 2}px`;
  container_word.style.fontSize = `${font_size}px`; // Set font size for text stimuli

  // Position the color buttons symmetrically
  const container_btns_x_center = container_btns.offsetWidth / 2;
  const radius_circle = btn_red.offsetHeight / 2;
  const circle_padding = 25; // Space between buttons

  btn_red.style.left = `${
    container_btns_x_center - radius_circle - 2 * circle_padding
  }px`;
  btn_blue.style.left = `${
    container_btns_x_center - radius_circle - 5 * circle_padding
  }px`;
  btn_green.style.left = `${
    container_btns_x_center - radius_circle + 4 * circle_padding
  }px`;
  btn_yellow.style.left = `${
    container_btns_x_center - radius_circle + circle_padding
  }px`;

  // Position and hide fixation cross
  fixation.style.left = `${container_btns_x_center}px`;
  fixation.style.top = `${canvas_height / 2}px`;
  fixation.classList.add("hidden");
}

/* ********************************
------------ Functions ---------- 
******************************** */

function present_word(word, word_color) {
  container_word.textContent = word; // Set word text
  container_word.style.color = `#${word_color}`; // Set word color
}

// -- Practice 1
const break_duration = 400; // Duration between two stimuli

function fixation_screen(duration) {
  // duration (int): duration in miliseconds for the fixation display
  fixation.classList.remove("hidden");
  container_word.classList.add("hidden");
  container_btns.classList.add("hidden");

  setTimeout(() => {
    fixation.classList.add("hidden");
    container_word.classList.remove("hidden");
    container_btns.classList.remove("hidden");
  }, duration);
}

/* ********************************
---------- Code Execution --------- 
******************************** */

btn_red.addEventListener("click", () => fixation_screen(break_duration));

// -- Practice 2
let holder_RT = [],
  holder_response = [],
  holder_timestamp = [];

let last_click = Date.now();

function log_data(response, timestamp) {
  holder_response.push(response);
  holder_RT.push(timestamp - last_click); // duration between word shown and click
  holder_timestamp.push(timestamp); // timestamp of click
  last_click = Date.now();

  //Logging to the console
  console.log("holder_response : ", holder_response);
  console.log("holder_RT : ", holder_RT);
  console.log("holder_timestamp : ", holder_timestamp);
}

btn_blue.addEventListener("click", () => log_data("blue", Date.now()));

present_word(words_set[3], colors_set[1]);
create_canvas();
