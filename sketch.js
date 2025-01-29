// bullet variables
let lastDirection = "Right";
let shot = false;
let bulletList = [];

// player variables
let player;
let playerSpeed = 10;
let playerSize = 20;

// background variables
let bgWidth = 1600;
let bgHeight = 800;

// paused variable
let paused = false;

// enemy variables
let enemySpeed = 12;
let enemySize = 20;
let enemy1;

// level arrays
levels = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(width / 2, height / 2);
  enemy1 = new Enemy(width/3, height / 3);

  // Add event listeners for pause menu buttons
  document.getElementById("pauseBtn").addEventListener("click", togglePause);
  document.getElementById("resumeBtn").addEventListener("click", togglePause);
  document.getElementById("levelSelectBtn").addEventListener("click", levelSelect);
  document.getElementById("homeBtn").addEventListener("click", goHome);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  let xLimit = constrain(player.x - width / 2, 0, bgWidth - width);
  let yLimit = constrain(player.y - height / 2, 0, bgHeight - height);

  let enemyXLimit = constrain(player.x - width / 2, 0, bgWidth - width);
  let enemyYLimit = constrain(player.y - height / 2, 0, bgHeight - height);

  drawBackground(xLimit, yLimit);
  player.show(xLimit, yLimit);
  enemy1.show(enemyXLimit, enemyYLimit);

  if (!paused) {
    player.move();
    enemy1.verticalMove();

    if (keyIsDown(32)) {
      bulletList.push(new Bullet());
    }

    for (let x of bulletList) {
      x.show();
      x.move(lastDirection);
      if (x.x > bgWidth || x.x < 0) {
        bulletList.pop();
      }
    }
  }
}

function designLevel(level) {}

// Toggle Pause State
function togglePause() {
  paused = !paused;
  let pauseMenu = document.getElementById("pauseMenu");

  if (paused) {
    pauseMenu.style.display = "flex"; // Show pause menu
  } else {
    pauseMenu.style.display = "none"; // Hide pause menu
  }

  // alert("Either the Resume or menu button were pressed.")
}

function levelSelect() {
  paused = false;
  document.getElementById("pauseMenu").classList.add("hidden");
  window.location.href = "www.thepossiblegame.com/levelSelect";
}

// Sends player to the home screen
function goHome() {
  paused = false;
  document.getElementById("pauseMenu").classList.add("hidden");
  window.location.href = "www.thepossiblegame.com";
}

// Draw the Background
function drawBackground(offsetX, offsetY) {
  fill(100);
  for (let x = 0; x < bgWidth; x += 50) {
    for (let y = 0; y < bgHeight; y += 50) {
      rect(x - offsetX, y - offsetY, 50, 50);
    }
  }
}

// Player Class
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move() {
    if (paused) return; // Stop movement when paused

    if (keyIsDown(LEFT_ARROW)) {
      lastDirection = "Left";
      this.x = max(this.x - playerSpeed, 0);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      lastDirection = "Right";
      this.x = min(this.x + playerSpeed, bgWidth - playerSize);
    }
    if (keyIsDown(UP_ARROW)) {
      this.y = max(this.y - playerSpeed, 0);
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y = min(this.y + playerSpeed, bgHeight - playerSize);
    }
  }

  show(offsetX, offsetY) {
    fill(0);
    rect(this.x - offsetX, this.y - offsetY, playerSize, playerSize);
  }
}

// Bullet Class
class Bullet {
  constructor() {
    this.x = player.x + playerSize / 2;
    this.y = player.y + playerSize / 2;
    this.speed = playerSpeed;
  }

  show() {
    circle(this.x, this.y, 3);
  }

  move(lastDirection) {
    if (paused) return; // Stop bullet movement when paused

    if (lastDirection === "Right") {
      this.x += this.speed;
    } else if (lastDirection === "Left") {
      this.x -= this.speed;
    }
  }
}

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  verticalMove() {
    if (paused) return; // Stop movement when paused

    this.y += enemySpeed;
  }

  show(offsetX, offsetY) {
    fill(0);
    circle(this.x - offsetX, this.y - offsetY, enemySize, enemySize);
  }
}

