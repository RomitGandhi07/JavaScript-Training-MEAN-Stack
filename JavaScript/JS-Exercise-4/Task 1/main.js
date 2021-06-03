let startTime,
  curTime = 0,
  timerInterval;

//This function is responsible for getting the current time
const getCurrentTime = () => {
  const now = new Date();
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  return `Time:- ${hours}:${minutes}:${seconds}`;
};

//This function is responsible for getting the current date
const getCurrentDate = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const now = new Date();
  const year = now.getFullYear();
  const month = months[now.getMonth()];
  const date = now.getDate();
  return `Date:- ${date}-${month}-${year}`;
}

//This is responsible for displaying the current time
setInterval(() => {
  document.getElementById("curTime").innerHTML = getCurrentTime();
}, 1000);

//This is responsible for displaying the current date
setInterval(() => {
  document.getElementById("curDate").innerHTML = getCurrentDate();
}, 1000);


//This function is responsible for change the timer content 
const changeTimerContent = (time) => document.getElementById("display").textContent = time;

//This function is responsible for convert miliseconds into seconds, minutes and hours
//And also convert them into string and return formatted time 
const timeToString = (miliSeconds) => {
  const seconds = Math.floor((miliSeconds / 1000) % 60);
  const minutes = Math.floor((miliSeconds / 60000) % 60);
  const hours = Math.floor((miliSeconds / 360000) % 24);

  let formattedMiliSeconds = miliSeconds.toString().slice(-2).padStart(2, "0");
  let formattedSeconds = seconds.toString().padStart(2, "0");
  let formattedMinutes = minutes.toString().padStart(2, "0");
  let formattedHours = hours.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMiliSeconds}`;
};

//This function is responsible for enabling the buttons
const enableButtons = (...buttons) => {
  buttons.forEach(button => {
    document.getElementById(button).disabled = false;
  });
};

//This function is responsible for disabling the buttons
const disableButtons = (...buttons) => {
  buttons.forEach(button => {
    document.getElementById(button).disabled = true;
  });
};

//This function is responsible for start or resume the timer
const start = () => {
  disableButtons("startButton", "resumeButton");
  enableButtons("stopButton", "resetButton");
  startTime = Date.now() - curTime;
  timerInterval = setInterval(() => {
    curTime = Date.now() - startTime;
    changeTimerContent(timeToString(curTime));
  }, 50);
};

//this function is responsible for stop the timer
const stop = () => {
  clearInterval(timerInterval);
  disableButtons("stopButton", "startButton");
  enableButtons("resumeButton", "resetButton");
};

//This function is responsible for reseting the timer
const reset = () => {
  clearInterval(timerInterval);
  changeTimerContent("00:00:00:00");
  curTime = 0;
  enableButtons("startButton");
  disableButtons("stopButton", "resumeButton", "resetButton");
};