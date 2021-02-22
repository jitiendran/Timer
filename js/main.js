//global declarations
const times = document.querySelector(".time-start");
const progress = document.querySelector(".circle-2");
const minutes = document.getElementById("minute");
const set = document.querySelector("button");
const beep = document.querySelector("audio");
const timeDisplay = document.getElementById("display_time");
const btn = document.createElement("button");

let clicked = 0;
let default_progress_value = 820;
let minutes_tobe_displayed = 0,
  seconds_tobe_displayed = 0,
  time = 0;

//Creating the button on hovering
times.addEventListener("mouseover", () => {
  btn.style.border = "1px solid rgba( 255, 255, 255, 0.18 )";
  btn.style.outline = "none";
  btn.style.width = "100%";
  btn.style.height = "100%";
  btn.style.borderRadius = "50%";
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
times.addEventListener("mouseleave", () => {
  btn.remove();
});

//Setting the values when set btn clicked
set.addEventListener("click", () => {
  if (minutes.value === "" || minutes.value <= 0) {
    alert("No value");
  } else {
    time = minutes.value * 60;
    minutes_tobe_displayed = minutes.value;
    minutes_tobe_displayed =
      minutes_tobe_displayed < 10
        ? "0" + minutes_tobe_displayed
        : minutes_tobe_displayed;
    timeDisplay.textContent = `${minutes_tobe_displayed} : 00`;
  }
});

//Created start btn on clicked timer starts
btn.addEventListener("click", () => {
  times.addEventListener("mouseover", () => {
    btn.remove();
  });
  clicked++;
  //only allowed click once
  if (clicked === 1) {
    const minimised = 820 / time;
    //This is the real timer functionality
    const timer = setInterval(() => {
      minutes_tobe_displayed = Math.floor(time / 60);
      seconds_tobe_displayed = time % 60;
      if (time <= 1) {
        beep.play();
        clearInterval(timer);
      }
      if (time <= 10) {
        progress.style.stroke = "red";
      }
      seconds_tobe_displayed =
        seconds_tobe_displayed < 10
          ? "0" + seconds_tobe_displayed
          : seconds_tobe_displayed;
      //for displaying in the dom
      timeDisplay.textContent = `${minutes_tobe_displayed} : ${seconds_tobe_displayed}`;
      time--;

      //increasing the progress bar
      default_progress_value -= minimised;
      progress.style.strokeDashoffset = default_progress_value;
    }, 1000);
  }
});
