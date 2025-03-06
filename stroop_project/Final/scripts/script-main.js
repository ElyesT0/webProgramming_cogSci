// 1. Comments in JavaScript
// - Single-line comments are written using `//`
// - Multi-line comments are written using `/* ... */`

// 2. Naming conventions for files
// - JavaScript files often use `camelCase` or `kebab-case` (e.g., `stroopTask.js`).
// - Constants are written in `UPPER_CASE` (e.g., `NUMBER_OF_TRIALS`).
// - Variables and functions use `camelCase` (e.g., `makeStimuliArray()`).

// 3. Understanding the basic components of HTML
// - JavaScript interacts with HTML using the DOM (Document Object Model).
// - DOM elements are accessed via `document.querySelector()` or `document.getElementById()`.

// 4. Automatically building the HTML structure with `!` in VS Code
// - In VS Code, typing `!` and pressing `Enter` auto-generates an HTML boilerplate.
// - It includes `<!DOCTYPE html>`, `<head>`, and `<body>` sections.

/*
- Stroop effect type of task. 2 parameters: word & color.
- Stimuli are shown sequentially in groups of 2. One trial = present stimulus A → present stimulus B → break → Response screen with prompt (same color/word? Yes/No).
- 10 trials, 4 colors tested (Red, Green, Blue, Yellow).
*/

'use strict'; // Enables strict mode, preventing common JavaScript mistakes.

const experiment_name = 'course_stroopTask';
const debug = false;
/* SUB-PART
======================================================
+++++++++++++++++ Variable definition ++++++++++++++++
======================================================
*/

// ---- Stimuli Definition -----

const words_set = ['red', 'green', 'blue', 'yellow'];
const colors_set = [
  // HEX Color format
  'c1121f', // red
  'a1c181', // green
  '118ab2', // blue
  'ffd60a', // yellow
];
const dict_set = Object.fromEntries(words_set.map((el, index) => [el, colors_set[index]]));

// Define experimental variables
const break_duration = 400; // Duration between two stimuli
const font_size = 50; // In a task based on reading, fontsize is an experimental variable.
const number_of_repetitions = 2; // How many times do we want to present each word and each color ?
const number_of_trials = number_of_repetitions * words_set.length;

// DOM selectors
const body = document.body;
const canvas = document.querySelector('.canvas');
const container_prompt = document.querySelector('.container-prompt'); // Will contain prompt for response phase + feedback text.
const container_word = document.querySelector('.container-word');
const fixation = document.querySelector('.fixation');
const container_btns = document.querySelector('.container-btns');
const btn_red = document.querySelector('.btn-red');
const btn_green = document.querySelector('.btn-green');
const btn_blue = document.querySelector('.btn-blue');
const btn_yellow = document.querySelector('.btn-yellow');
const btn_start = document.querySelector('.btn-start');

// Counters
var counter_trial = 0;
var last_click = Date.now();

/* SUB-PART
======================================================
+++++++++++++++ Instructions and text ++++++++++++++++
======================================================
*/

const prompt_trial_fr = 'Quelle couleur désigne le mot ?';
const prompt_trial_eng = 'What does the word means?';

const ending_message_fr = "L'expérience est terminée \nMerci de votre participation.";
const ending_message_eng = 'The experiment is over\nThank you for participating.';

/* SUB-PART
======================================================
++++++++++++++++++++ Stimuli set +++++++++++++++++++++
======================================================
*/

/**
 * Destructuring assignment extracts values from an array returned by a function.
 *
 * `make_stimuli_array(words_set, number_of_repetitions)` returns an array with two elements:
 *  - The first element is assigned to `stimuli_word`
 *  - The second element is assigned to `stimuli_color`
 *
 * This avoids manually indexing the returned array (e.g., `result[0]`, `result[1]`).
 */
const [stimuli_word, stimuli_color] = make_stimuli_array(words_set, number_of_repetitions);

/* SUB-PART
======================================================
++++++++++++++++ Participant object ++++++++++++++++++
======================================================
*/

// Store participant's data in a structured format
var participant = {};
const random_id = makeId();

// `.fill(value)` creates an array of length `number_of_trials` filled with the specified value.
// This ensures consistency (same number of values per property) when converting data to JSON or CSV.
participant.participant_ID = Array(number_of_trials).fill(random_id); // Unique participant ID
participant.participant_starting_time = Array(number_of_trials).fill(Date.now()); // Timestamp of experiment start
participant.experiment_break_duration = Array(number_of_trials).fill(break_duration); // Break duration for each trial
participant.experiment_font_size = Array(number_of_trials).fill(font_size); // Font size used in experiment

// Arrays storing the stimuli shown to the participant
participant.stimuli_shown_word = stimuli_word;
participant.stimuli_shown_color = stimuli_color;

// Response data initialized with `-1` (placeholder for missing values)
participant.response_color = Array(number_of_trials).fill(-1); // Color chosen by participant
participant.response_RT = Array(number_of_trials).fill(-1); // Reaction time (RT) in milliseconds
participant.response_timestamp = Array(number_of_trials).fill(-1); // Timestamp of response

/* SUB-PART
======================================================
++++++++++++++++ Functions definition ++++++++++++++++
======================================================
*/
/**
 * Creates and positions the canvas and all visual elements needed for the experiment.
 * This function dynamically adjusts element sizes and positions based on the screen size.
 */
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

  btn_red.style.left = `${container_btns_x_center - radius_circle - 2 * circle_padding}px`;
  btn_blue.style.left = `${container_btns_x_center - radius_circle - 5 * circle_padding}px`;
  btn_green.style.left = `${container_btns_x_center - radius_circle + 4 * circle_padding}px`;
  btn_yellow.style.left = `${container_btns_x_center - radius_circle + circle_padding}px`;

  // Position and hide fixation cross
  fixation.style.left = `${container_btns_x_center}px`;
  fixation.style.top = `${canvas_height / 2}px`;
  fixation.classList.add('hidden');
}

/**
 * Displays a word on the screen with the specified color.
 * @param {string} word - The word to display.
 * @param {string} word_color - The color (HEX format) of the word.
 */
function present_word(word, word_color) {
  container_word.textContent = word; // Set word text
  container_word.style.color = `#${word_color}`; // Set word color
}

/**
 * Updates the prompt container with the given text.
 * @param {string} prompt_text - The text to display in the prompt.
 */
function write_prompt(prompt_text) {
  container_prompt.textContent = prompt_text;
}

/**
 * Generates a unique random participant ID.
 * @returns {string} - A 12-character alphanumeric participant ID.
 */
function makeId() {
  let participant_ID = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // Generate a 12-character ID by selecting random characters
  for (var i = 0; i < 12; i++) {
    participant_ID += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return participant_ID;
}

/**
 * Shuffles an array by randomly swapping elements multiple times.
 * Uses the Fisher-Yates-like algorithm for in-place shuffling.
 * @param {Array} arr - The array to shuffle.
 * @returns {Array} - The shuffled array.
 */
function shuffle_array(arr) {
  for (let i = 0; i < arr.length; i++) {
    let rand_1 = Math.trunc(Math.random() * arr.length);
    let rand_2 = Math.trunc(Math.random() * arr.length);

    // Swap two random elements in the array
    let temp = arr[rand_1];
    arr[rand_1] = arr[rand_2];
    arr[rand_2] = temp;
  }
  return arr;
}

/**
 * Generates the stimuli arrays for the experiment.
 * Ensures a balanced number of trials where words either match or do not match their colors.
 *
 * @param {Array} color_set - The set of colors used in the experiment.
 * @param {number} number_of_repetitions - The number of times each word/color pair should appear.
 * @returns {[Array, Array]} - Two arrays: one with words, the other with corresponding colors.
 */
function make_stimuli_array(color_set, number_of_repetitions) {
  // Create an array of 0s (non-matching) and 1s (matching) for half the trials each
  let condition_matching = Array((number_of_repetitions * colors_set.length) / 2)
    .fill([0, 1])
    .flatMap((arr) => [...arr]); // Flattens the array so it's a single sequence of 0s and 1s

  shuffle_array(condition_matching); // Randomize matching conditions

  let stim_color_set = [];
  let stim_word_set = Array(number_of_repetitions)
    .fill(color_set)
    .flatMap((arr) => [...arr]); // Expand color_set for the desired number of repetitions

  stim_word_set = shuffle_array(stim_word_set); // Shuffle words randomly

  for (let i = 0; i < condition_matching.length; i++) {
    if (condition_matching[i]) {
      // Matching condition: word and color match
      stim_color_set.push(dict_set[`${stim_word_set[i]}`]);
    } else {
      // Non-matching condition: word does NOT match the color

      // Get all colors except the one that matches the word
      let availableColors = Object.values(dict_set).filter(
        (color) => color !== dict_set[`${stim_word_set[i]}`]
      );

      // Select a random non-matching color
      let randomIndex = Math.floor(Math.random() * availableColors.length);
      stim_color_set.push(availableColors[randomIndex]);
    }
  }
  return [stim_word_set, stim_color_set]; // Return both word and color sequences
}

// Function that initialize the experiment: Draw the elements + Make the button responsive
function initialize_experiment() {
  create_canvas();
}

// Function that makes the word and buttons disappear and fixation appear
function fixation_screen(duration) {
  // duration (int): duration in miliseconds for the fixation display
  fixation.classList.remove('hidden');
  container_word.classList.add('hidden');
  container_btns.classList.add('hidden');

  setTimeout(() => {
    fixation.classList.add('hidden');
    container_word.classList.remove('hidden');
    container_btns.classList.remove('hidden');
  }, duration);
}

// Log data in the participant's object
function log_data(response, timestamp) {
  participant.response_color[counter_trial] = response;
  participant.response_RT[counter_trial] = timestamp - last_click - break_duration; // duration between word shown and click
  participant.response_timestamp[counter_trial] = timestamp; // timestamp of click
}

// Function that aggregates everything into one trial
function trial(response, timestamp) {
  // Collect the data
  log_data(response, timestamp);

  // Increment the trial counter
  counter_trial += 1;

  // Update the timestamp of the last click
  last_click = Date.now();

  if (counter_trial == stimuli_word.length) {
    // If no more stimuli, end the experiment
    end_experiment();
  } else {
    // If more stimuli need to be shown: fixation then new presentation
    fixation_screen(break_duration);
    present_word(stimuli_word[counter_trial], stimuli_color[counter_trial]);
  }
  if (!debug) {
    saveParticipantData(experiment_name, participant.participant_ID[0], participant);
  }
}

// Function that starts the experiment
function run_experiment() {
  last_click = Date.now();
  btn_start.classList.add('hidden');
  initialize_experiment();
  write_prompt(prompt_trial_fr);
  present_word(stimuli_word[counter_trial], stimuli_color[counter_trial]);

  btn_blue.addEventListener('click', () => trial('blue', Date.now()));
  btn_red.addEventListener('click', () => trial('red', Date.now()));
  btn_green.addEventListener('click', () => trial('green', Date.now()));
  btn_yellow.addEventListener('click', () => trial('yellow', Date.now()));
}

// Function that ends the experiment
function end_experiment() {
  container_btns.classList.add('hidden');
  container_word.classList.add('hidden');
  container_prompt.textContent = ending_message_fr;
  console.log('Experiment is ending...');
  saveParticipantData(experiment_name, participant.participant_ID[0], participant);
}

/* SUB-PART
======================================================
++++++++++++++++++++ Code Execution ++++++++++++++++++
======================================================
*/
btn_start.style.left = `${(body.offsetWidth - btn_start.offsetWidth) / 2}px`;
btn_start.style.top = `${(body.offsetHeight - btn_start.offsetHeight) / 2}px`;
btn_start.addEventListener('click', () => run_experiment());
