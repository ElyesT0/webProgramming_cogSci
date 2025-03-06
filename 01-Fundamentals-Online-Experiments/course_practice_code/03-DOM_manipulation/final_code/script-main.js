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
// ---- Practice 1
console.log("window.innerWidth : ", window.innerWidth);
console.log("window.screen.width : ", window.screen.width);
let canvas_style = window.getComputedStyle(canvas);
console.log("canvas_style.margin", canvas_style.margin);

// ---- Practice 2
// Apply canvas dimensions and margins
canvas.style.height = `${canvas_height}px`;
canvas.style.width = `${canvas_width}px`;
canvas.style.margin = `${canvas_margin_y}px ${canvas_margin_x}px`;

container_word.style.left = `${(canvas_width - container_word_width) / 2}px`;
container_word.style.top = `${(canvas_height - container_word_height) / 2}px`;
container_word.style.fontSize = `${font_size}px`; // Set font size for text stimuli

// ---- Practice 3
const container_btns = document.createElement("div");
container_btns.classList.add("container-btns");

for (let color of words_set) {
  let div = document.createElement("div");
  div.classList.add("btn");
  div.classList.add(`btn-${color}`);
  container_btns.appendChild(div);
}

canvas.appendChild(container_btns);

/* ********************************
------------ Functions ---------- 
******************************** */

// ---- Practice 2
btn_start.classList.add("hidden");
function present_word(word, word_color) {
  container_word.textContent = word; // Set word text
  container_word.style.color = `#${word_color}`; // Set word color
}

/* ********************************
---------- Code Execution --------- 
******************************** */

present_word(words_set[3], colors_set[1]);
