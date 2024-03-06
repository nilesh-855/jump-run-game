let ball = document.getElementsByClassName("ball")[0];
let ballHeight = parseInt(
  window.getComputedStyle(ball).getPropertyValue("height")
);
let ballWidth = parseInt(
  window.getComputedStyle(ball).getPropertyValue("width")
);
let ballRight = parseInt(
  window.getComputedStyle(ball).getPropertyValue("right")
);
let ballBottom = parseInt(
  window.getComputedStyle(ball).getPropertyValue("bottom")
);
console.log(ballHeight, ballWidth);
let ground = document.getElementsByClassName("ground")[0];
let groundBottom = parseInt(
  window.getComputedStyle(ground).getPropertyValue("bottom")
);
let groundWidth = parseInt(
  window.getComputedStyle(ground).getPropertyValue("width")
);
let isJumping = false;

function jump() {
  if (isJumping) {
    return;
  }
  upTime = setInterval(() => {
    if (ballBottom >= groundBottom + 400) {
      clearInterval(upTime);
      downTime = setInterval(() => {
        if (ballBottom <= groundBottom + 110) {
          clearInterval(downTime);
          isJumping = false;
        }
        ballBottom -= 10;
        ball.style.bottom = ballBottom + "px";
      }, 15);
    }
    ballBottom += 10;
    ball.style.bottom = ballBottom + "px";
    isJumping = true;
  }, 15);
}
function generateObstracle() {
  let obstracles = document.getElementsByClassName("obstracles")[0];
  let obstracle = document.createElement("div");
  obstracle.setAttribute("class", "obstracle");
  obstracles.appendChild(obstracle);
  let obstracleWidth = 30;
  let obstracleHeight = Math.floor(Math.random() * 50 + 60);
  let obstracleBackground = `rgb(${Math.floor(
    Math.random() * 255 + 50
  )},${Math.floor(Math.random() * 255 + 50)},${Math.floor(
    Math.random() * 255 + 50
  )})`;
  let obstracleBottom = 100;
  let obstracleRight = -30;
  function moveObstracle() {
    obstracleRight += 3;
    obstracle.style.right = obstracleRight + "px";
    obstracle.style.bottom = obstracleBottom + "px";
    obstracle.style.height = obstracleHeight + "px";
    obstracle.style.width = obstracleWidth + "px";
    obstracle.style.backgroundColor = obstracleBackground;
    if (
      ballRight + ballWidth >= obstracleRight &&
      ballRight <= obstracleRight + obstracleWidth &&
      ballBottom <= obstracleBottom + obstracleHeight
    ) {
      alert("game over!");
      clearInterval(obstracleInterval);
      clearTimeout(obstracleTimeOut);
      location.reload();
    }
  }
  let obstracleInterval = setInterval(moveObstracle, 10);
  let obstracleTimeOut = setTimeout(generateObstracle, 1200);
}

generateObstracle();

function upClick(e) {
  if (e.keyCode == "38" || e.keyCode == "32") {
    console.log("up");
    jump();
  }
}
document.addEventListener("keydown", upClick);
