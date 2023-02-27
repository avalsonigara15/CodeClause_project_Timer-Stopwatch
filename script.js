const semicircles = document.querySelectorAll(".semicircle");
const timer = document.querySelector(".timer");

function start() {
  const hr = document.getElementById("hr").value;
  const min = document.getElementById("min").value;
  const sec = document.getElementById("sec").value;
  const hours = hr * 3600000;
  const minutes = min * 60000;
  const second = sec * 1000;
  const setTime = hours + minutes + second;
  const startTime = Date.now();
  const futureTime = startTime + setTime;

  let timerLoop = setInterval(countDownTimer);
  countDownTimer();

  function countDownTimer() {
    const currentTime = Date.now();
    const remainningTime = futureTime - currentTime;
    const angle = (remainningTime / setTime) * 360;

    if (angle > 180) {
      semicircles[2].style.display = "none";
      semicircles[0].style.transform = "rotate(180deg)";
      semicircles[1].style.transform = `rotate(${angle}deg)`;
    } else {
      semicircles[2].style.display = "block";
      semicircles[0].style.transform = `rotate(${angle}deg)`;
      semicircles[1].style.transform = `rotate(${angle}deg)`;
    }

    const hrs = Math.floor(
      (remainningTime / (1000 * 60 * 60)) % 24
    ).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
    const mins = Math.floor((remainningTime / (1000 * 60)) % 60).toLocaleString(
      "en-US",
      { minimumIntegerDigits: 2, useGrouping: false }
    );
    const secs = Math.floor((remainningTime / 1000) % 60).toLocaleString(
      "en-US",
      { minimumIntegerDigits: 2, useGrouping: false }
    );

    timer.innerHTML = `
    <div>${hrs}</div>
    <div class="colon">:</div>
    <div>${mins}</div>
    <div class="colon">:</div>
    <div>${secs}</div>`;

    if (remainningTime <= 6000) {
      semicircles[0].style.backgroundColor = "red";
      semicircles[1].style.backgroundColor = "red";
      timer.style.color = "red";
    }

    if (remainningTime < 0) {
      clearInterval(timerLoop);
      semicircles[0].style.display = "none";
      semicircles[1].style.display = "none";
      semicircles[2].style.display = "none";

      timer.innerHTML = `
      <div>00</div>
      <div class="colon">:</div>
      <div>00</div>
      <div class="colon">:</div>
      <div>00</div>`;
      timer.style.color = "lightgrey";
    }
  }
}
function reset1() {
  // clearInterval(timerLoop);
  document.getElementById("hr").value = 0;
  document.getElementById("min").value = 0;
  document.getElementById("sec").value = 0;

  semicircles[0].style.display = "none";
  semicircles[1].style.display = "none";
  semicircles[2].style.display = "none";
}
