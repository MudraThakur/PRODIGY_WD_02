let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false; // ✅ Track the running state

function timeToString(time) {
  let hrs = Math.floor(time / 3600000);
  let mins = Math.floor((time % 3600000) / 60000);
  let secs = Math.floor((time % 60000) / 1000);

  return (
    (hrs < 10 ? "0" + hrs : hrs) + ":" +
    (mins < 10 ? "0" + mins : mins) + ":" +
    (secs < 10 ? "0" + secs : secs)
  );
}

function start() {
  if (isRunning) return; // ✅ Prevent multiple intervals

  isRunning = true;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    document.getElementById("display").innerText = timeToString(elapsedTime);
  }, 1000);
}

function pause() {
  if (!isRunning) return; // ✅ Only pause if running

  clearInterval(timerInterval);
  isRunning = false;
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  document.getElementById("display").innerText = "00:00:00";
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (!isRunning) return; // ✅ Don't record lap if paused/stopped

  const lapTime = timeToString(elapsedTime);
  const li = document.createElement("li");
  li.innerText = "Lap: " + lapTime;
  document.getElementById("laps").appendChild(li);
}
