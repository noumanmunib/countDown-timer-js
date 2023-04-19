const displayTimer = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
let countdown;

const timer = function (seconds) {
  // Clears the timer as soon as the next timer fires
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const timeLeft = Math.round((then - Date.now()) / 1000);
    // Stop if below zero!
    if (timeLeft <= 0) {
      clearInterval(countdown);
      return;
    }

    // Display time left
    displayTimeLeft(timeLeft);
  }, 1000);
};

const displayTimeLeft = function (seconds) {
  const hours = Math.floor(seconds / 3600);
  const remainderMin = Math.floor((seconds % 3600) / 60);
  const remainderSec = seconds % 60;
  //   console.log(hours, remainderMin, remainderSec);

  displayTimer.textContent = `${hours < 10 ? "0" + hours : hours}:${
    remainderMin < 10 ? "0" + remainderMin : remainderMin
  }:${remainderSec < 10 ? "0" + remainderSec : remainderSec}`;
};

const displayEndTime = function (timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const adjustedHours = hours > 12 ? hours - 12 : hours;
  const minutes = end.getMinutes();

  endTime.textContent = `I'll be back at ${
    adjustedHours < 10 ? "0" + adjustedHours : adjustedHours
  }:${minutes < 10 ? "0" + minutes : minutes}`;
};

const handleButton = function (e) {
  //   console.log(this.dataset.time);
  const time = this.dataset.time;
  timer(time);
};

buttons.forEach((button) => button.addEventListener("click", handleButton));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const timeInput = this.time.value;
  timer(timeInput);
  this.reset();
});
