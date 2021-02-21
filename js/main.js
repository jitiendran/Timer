//global declarations
const times = document.querySelector(".time-start");
const progress = document.querySelector(".circle-2");
const hours = document.getElementById("hour");
const minutes = document.getElementById("minute");
const seconds = document.getElementById("second");
const set = document.querySelector("button");
const beep = document.querySelector("audio");
const timeDisplay = document.getElementById("display_time");
const svg = document.querySelector("svg");
const btn = document.createElement("button");
let clicked = 0;
let default_progress_value = 820;
let hours_tobe_displayed = 0,
  minutes_tobe_displayed = 0,
  seconds_tobe_displayed = 0,
  time_provided = 0;

//Creating the button on hovering
times.addEventListener("mouseover", () => {
  // btn.style.border = " 1px solid rgba( 255, 255, 255, 0.18 )";
  btn.style.border = "1px solid rgba( 255, 255, 255, 0.18 )";
  btn.style.outline = "none";
  btn.style.width = "100%";
  btn.style.height = "100%";
  btn.style.borderRadius = "50%";
  // btn.style.background = "rgba( 51, 51, 51, 0.80 )";
  btn.style.backdropFilter = "blur(0px)";
  btn.style.background = "rgba( 255, 255, 255, 0.85 )";
  btn.style.fontSize = "1.3em";
  btn.style.cursor = "pointer";
  btn.textContent = "start";
  btn.style.color = "#333";
  btn.style.textTransform = "uppercase";
  btn.style.zIndex = "2";
  btn.style.position = "absolute";
  btn.style.marginLeft = "-2.8em";
  btn.style.marginTop = "-5.5em";
  times.appendChild(btn);
});

//Removing the button on leaving the times
times.addEventListener("mouseleave", () => {
  btn.remove();
});

//Setting the values when set btn clicked
set.addEventListener("click", () => {
  hours_tobe_displayed = hours.value;
  minutes_tobe_displayed = minutes.value;
  seconds_tobe_displayed = seconds.value - 1;
  if (hours.value === "") {
    hours_tobe_displayed = "00";
  }
  if (minutes.value === "") {
    minutes_tobe_displayed = "00";
  }
  time_provided = hours.value * 3600 + minutes.value * 60 + seconds.value - 1;
  seconds_tobe_displayed = time_provided % 60;
  minutes_tobe_displayed = (time_provided - seconds_tobe_displayed) % 59;
  timeDisplay.textContent = `${hours_tobe_displayed} : ${minutes_tobe_displayed} : ${seconds_tobe_displayed}`;
});

//Created start btn on clicked timer starts
btn.addEventListener("click", () => {
  times.addEventListener("mouseover", () => {
    btn.remove();
  });
  clicked++;
  //only allowed click once
  if (clicked === 1) {
    //converting all the values to seconds

    //setting values of hours,minutes and seconds
    const minimised = 820 / (time_provided + 1);

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

      if (time_provided <= 3) {
        times.style.color = "red";
        progress.style.stroke = "red";
      }

      //for displaying in the dom
      seconds_tobe_displayed = time_provided % 60;
      minutes_tobe_displayed = (time_provided - seconds_tobe_displayed) % 59;
      timeDisplay.textContent = `${hours_tobe_displayed} : ${minutes_tobe_displayed} : ${seconds_tobe_displayed}`;
      seconds_tobe_displayed -= 1;
      time_provided -= 1;

      //increasing the progress bar
      default_progress_value -= minimised;
      progress.style.strokeDashoffset = default_progress_value;
    }, 1000);
  }
});
