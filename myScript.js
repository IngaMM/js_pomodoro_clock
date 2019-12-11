const DTSKey = document.querySelector("#decreaseTimeSession");
const ITSKey = document.querySelector("#increaseTimeSession");
const DTBKey = document.querySelector("#decreaseTimeBreak");
const ITBKey = document.querySelector("#increaseTimeBreak");
const STSKey = document.querySelector("#setTimeSession");
const STBKey = document.querySelector("#setTimeBreak");
const startKey = document.querySelector("#start");
const pauseKey = document.querySelector("#pause");
const stopKey = document.querySelector("#stop");

DTSKey.addEventListener("click", function() {
  changeTime("decrease", "session");
});
ITSKey.addEventListener("click", function() {
  changeTime("increase", "session");
});
DTBKey.addEventListener("click", function() {
  changeTime("decrease", "break");
});
ITBKey.addEventListener("click", function() {
  changeTime("increase", "break");
});
STSKey.addEventListener("click", function() {
  setTime("session");
});
STBKey.addEventListener("click", function() {
  setTime("break");
});
startKey.addEventListener("click", function() {
  startCountDown();
});
pauseKey.addEventListener("click", function() {
  pauseCountDown();
});
stopKey.addEventListener("click", function() {
  stopCountDown();
});

// Initial time as a global variable
let initialTimeString = document.getElementById("numberOnDisplay").textContent;
let currentTime;

// Current status as a global variable
let currentStatus = "session";

// Timer as global variable
let timer;

function startCountDown() {
  // Get time from display
  let timeString = document.getElementById("numberOnDisplay").textContent;

  // Calculate time in seconds
  currentTime =
    parseInt(timeString.split(":")[0]) * 60 +
    parseInt(timeString.split(":")[1]);

  // Start the countdown
  timer = setInterval(function() {
    Clock();
  }, 1000);
}

function pauseCountDown() {
  clearInterval(timer);
}

function stopCountDown() {
  clearInterval(timer);

  // Clear display
  removeElementById("numberOnDisplay");

  // Show initial time again
  addElementById("span", "numberOnDisplay", "#display", initialTimeString);
}

function Clock() {
  // Decrease seconds by 1
  currentTime -= 1;

  // Do not go below 0
  if (currentTime < 0) {
    currentTime = 0;
  }

  // Calculate minutes and seconds
  let minutesLeft = Math.floor((currentTime % (60 * 60)) / 60);
  let secondsLeft = Math.floor(currentTime % 60);

  // Remove current time from display
  removeElementById("numberOnDisplay");

  // Show time with two digits for minutes and seconds
  let minutesLeftString = minutesLeft < 10 ? "0" + minutesLeft : minutesLeft;
  let secondsLeftString = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

  // Show new time on display
  addElementById(
    "span",
    "numberOnDisplay",
    "#display",
    minutesLeftString + ":" + secondsLeftString
  );

  // Stop clock when time is over and switch from session to break and vice versa and start clock
  if (currentTime === 0) {
    clearInterval(timer);
    currentStatus = currentStatus === "session" ? "break" : "session";
    setTime(currentStatus);
    startCountDown();
  }
}

function changeTime(direction, type) {
  let timeOfWhich = type === "session" ? "timeSession" : "timeBreak";

  const timeString = document.getElementById(timeOfWhich).textContent;

  let time =
    parseInt(timeString.split(":")[0]) * 60 +
    parseInt(timeString.split(":")[1]);

  if (direction === "decrease") {
    if (time > 10) {
      time -= 10;
    }
  }

  if (direction === "increase") {
    if (time < 59 * 60 + 50) {
      time += 10;
    }
  }

  removeElementById(timeOfWhich);

  let minutes = Math.floor((time % (60 * 60)) / 60);
  let seconds = Math.floor(time % 60);
  let minutesString = minutes < 10 ? "0" + minutes : minutes;
  let secondsString = seconds < 10 ? "0" + seconds : seconds;

  addElementById(
    "span",
    timeOfWhich,
    "#" + timeOfWhich + "Container",
    minutesString + ":" + secondsString
  );
}

function setTime(type) {
  // Stop the timer
  clearInterval(timer);

  // Remove current number on display
  removeElementById("numberOnDisplay");

  // Set current currentStatus
  currentStatus = type;

  // Get time for session or break
  let timeOfWhich = type === "session" ? "timeSession" : "timeBreak";
  const timeString = document.getElementById(timeOfWhich).textContent;

  initialTimeString = timeString;

  // Show new time on display
  addElementById("span", "numberOnDisplay", "#display", timeString);

  // Show border around "Session" or "Break"
  let title = type === "session" ? "titleSession" : "titleBreak";
  let otherTitle = type === "session" ? "titleBreak" : "titleSession";

  let element = document.getElementById(title);
  element.setAttribute("class", "titleWithBorder");

  element = document.getElementById(otherTitle);
  element.removeAttribute("class");
}

/////////////////// Helper functions ///////////////////

function removeElementById(IdName) {
  const element = document.getElementById(IdName);
  // remove element only if present
  if (element) {
    element.parentNode.removeChild(element);
  }
}

function addElementById(elementType, IdName, parentId, textContent) {
  // add element only if not present
  const check = document.getElementById(IdName);
  if (!check) {
    const container = document.querySelector(parentId);
    const element = document.createElement(elementType);
    element.textContent = textContent;
    element.setAttribute("id", IdName);
    container.appendChild(element);
  }
}
