//global declarations
const times = document.querySelector(".time-start");
const progress = document.querySelector(".circle-2");
const hours = document.getElementById("hour");
const minutes = document.getElementById("minute");
const seconds = document.getElementById("second");
const set = document.querySelector("button");
const beep = document.querySelector("audio");
let default_progress_value = 820;
let hours_tobe_displayed = 0,
  minutes_tobe_displayed = 0,
  seconds_tobe_displayed = 0;

//on clicking set button
set.addEventListener("click", () => {
  //converting all the values to seconds
  let time_provided =
    hours.value * 3600 + minutes.value * 60 + seconds.value - 1;
  const minimised = 820 / (time_provided + 1);

  //setting values of hours,minutes and seconds
  hours_tobe_displayed = hours.value;
  minutes_tobe_displayed = minutes.value;
  seconds_tobe_displayed = seconds.value - 1;

  //checking whether the value of hours ans minutes are null
  if (hours.value === "") {
    hours_tobe_displayed = "00";
  }
  if (minutes.value === "") {
    minutes_tobe_displayed = "00";
  }
  //This is the real timer functionality
  const timer = setInterval(() => {
    if (time_provided <= 0) {
      beep.play();
      clearInterval(timer);
    }

    if (time_provided == 3) {
      times.style.color = "red";
    }

    //for displaying in the dom
    times.textContent = `${hours_tobe_displayed} : ${minutes_tobe_displayed} : ${seconds_tobe_displayed}`;
    seconds_tobe_displayed -= 1;
    time_provided -= 1;

    //increasing the progress bar
    default_progress_value -= minimised;
    progress.style.strokeDashoffset = default_progress_value;
  }, 1000);
});
