let timerInterval = null;
let totalTime = 0;
let remainingTime = 0;

const timerSound = new Audio("assets/sounds/timer-end.mp3");
timerSound.volume = 0.4;

document.addEventListener("DOMContentLoaded", () => {

  const timerCircle = document.getElementById("timer-circle");
  const timerWidget = document.querySelector(".timer-widget");

  timerWidget.classList.add("collapsed");

  timerCircle.addEventListener("click", () => {

    if (timerInterval) {
      stopTimer();
      return;
    }

    timerWidget.classList.toggle("collapsed");

  });

});

function startTimer(seconds) {

  clearInterval(timerInterval);

  totalTime = seconds;
  remainingTime = seconds;

  document.body.classList.add("timer-running");
  document.querySelector(".timer-widget").classList.add("collapsed");

  updateTimerUI();

  timerInterval = setInterval(() => {

    remainingTime--;

    updateTimerUI();

    if (remainingTime <= 0) {
      finishTimer();
    }

  }, 1000);

}

function stopTimer() {

  clearInterval(timerInterval);
  timerInterval = null;

  resetTimerUI();

}

function finishTimer() {

  clearInterval(timerInterval);
  timerInterval = null;

  document.getElementById("timer-display").textContent = "✔";

  timerSound.currentTime = 0;
  timerSound.play();

  setTimeout(resetTimerUI, 1500);

}

function resetTimerUI() {

  document.getElementById("timer-progress").style.strokeDashoffset = 100;
  document.getElementById("timer-progress").style.stroke =
    "rgba(255,255,255,0.85)";

  document.getElementById("timer-display").textContent = "Timer";

  document.body.classList.remove("timer-running");

}

function updateTimerUI() {

  const progress = document.getElementById("timer-progress");

  const percent = remainingTime / totalTime;

  progress.style.strokeDashoffset = 100 - percent * 100;

  progress.style.stroke =
    remainingTime <= 5
      ? "#38BDF8"
      : "rgba(255,255,255,0.85)";

  document.getElementById("timer-display").textContent =
    remainingTime + "s";

}