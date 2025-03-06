"use strict";

// SUB-PART
/* ********************************
------------ Functions ------------ 
******************************** */

function expression_func(text) {
  console.log(text);
}

const declaration_func = function (text) {
  console.log(text);
};

// Arrow function
(text) => {
  console.log(text);
};

expression_func();

// SUB-PART
/* ********************************
------------- Arrays -------------- 
******************************** */

const array_stimuli = ["red", "blue", "yellow"];
const array_responses = [];

// === Useful Methods for Arrays
// .push()
array_responses.push(2);
array_responses.push(3);
array_responses.push(1);
console.log(array_responses); // output: [2, 3, 1]

// .join()
const str_stimuli = array_stimuli.join(",");
console.log("str_stimuli : ", str_stimuli); // output: "str_stimuli :  red,blue,yellow"

// .length
console.log(array_stimuli.length); //output: 3

// SUB-PART
/* ********************************
------------- Objects -------------
******************************** */

const my_participant_data = {
  participant_id: "insert_random_id",
  participant_starting_time: Date.now(),
  participant_responses: [],
};

// Accessing values of the object
console.log(my_participant_data.participant_id); // output: insert_random_id
console.log(my_participant_data["participant_id"]); // output: insert_random_id

// Adding a property to the Object
my_participant_data.participant_RT = [];

// Adding individual values to responses
my_participant_data.participant_responses.push(1);
my_participant_data.participant_responses.push(2);
my_participant_data.participant_responses.push(3);
console.log(
  "my_participant_data.participant_responses.length : ",
  my_participant_data.participant_responses.length
);

// --- User-Object Interface
// Accessing Keys and Values of the object without reference.
console.log(Object.keys(my_participant_data)); // output: ['participant_id', 'participant_starting_time', 'participant_responses']
console.log(Object.values(my_participant_data)); // output: ['insert_random_id', 1741186733662, Array(0)]

// .length
console.log(
  "Object.keys(my_participant_data).length",
  Object.keys(my_participant_data).length
);

// SUB-PART
/* ********************************
----------- For Loops -------------
******************************** */
let counter = 0;

for (let i = 0; i < 5; i++) {
  counter += 1;
}

console.log("counter : ", counter); //output: "counter : 5"

/* ********************************
------ For Loops / If-else --------
******************************** */

// *** Practice - 1
let counter_trial = 0;
let counter_block = 1;
const total_nb_trials_per_block = 10;
const total_nb_trials = 60;

for (let i = 0; i < total_nb_trials; i++) {
  if ((counter_trial % total_nb_trials_per_block == 0) & (counter_trial != 0)) {
    counter_block += 1;
    console.log("Moving to Block : ", counter_block);
  }
  counter_trial += 1;
}

// *** Practice - 2
// Define all the needed properties
my_participant_data.experiment_stimuli = ["blue", "red", "yellow"];
my_participant_data.participant_responses = ["red", "red", "blue"];
my_participant_data.participant_performance = [];

// Reset counter for trials
counter_trial = 0;

for (let i = 0; i < my_participant_data.experiment_stimuli.length; i++) {
  if (
    my_participant_data.participant_responses[counter_trial] ==
    my_participant_data.experiment_stimuli[counter_trial]
  ) {
    my_participant_data.participant_performance.push("success");
  } else {
    my_participant_data.participant_performance.push("fail");
  }
  counter_trial += 1;
}

console.log(
  "participant_performance",
  my_participant_data.participant_performance
); //output: (3) ['fail', 'success', 'fail']
