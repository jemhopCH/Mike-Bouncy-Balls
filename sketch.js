
let numBalls;
let spring = 0.7;
let gravity = 0.00;
let friction = -0.9;
let balls = [];
let soundOn = false;
function preload()
{
  bounce = loadSound("bounce.wav")
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //makes the number of balls relative to the size of the screen
  button = createButton("Sound Toggle");
  button.position(19, 19);
  button.mousePressed(toggleSound);
  numBalls = (width+height)/65;
  print(numBalls)
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(30, 70),
      i,
      balls
    );
  }
  strokeWeight(1);
  fill(255, 204);
  bounce.setVolume(0.01)
  
}
function toggleSound()
  {
    soundOn = !soundOn
  }
    

function draw() {
  background(255,180,200);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
  
}

class Ball {
  constructor(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;

      if (distance < minDist) {
        let hasPlayed = false;
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
        if (soundOn && hasPlayed == false)
        {
          bounce.play();
        }
        
      }
    }
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
