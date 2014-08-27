
window.onload = drawCanvas;
var update = null;
//window.setTimeout(stopUpdate, 5000);
window.onkeydown = inputKeyDown;
window.onkeyup = inputKeyUp;

var keysDown = [];
var gameRunning = false;

function Character(x, y) {
  this.posX = x;
  this.posY = y;
  var startX = x;
  var startY = y;

  this.reset = function() {
    this.posX = startX;
    this.posY = startY;
  }
}

var enemies = [new Character(50, 50), new Character(50, 150), new Character(50, 250), new Character(50, 350)]
var player = new Character(100, 100);

function reset() {
  player.reset();

  if (update === null)
  {
    drawCanvas();
  }
}

function drawCanvas() {
  gameRunning ? drawGameScreen() : drawSplashScreen();
}

function drawSplashScreen() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  ctx.clearRect(0, 0, c.width, c.height);
        
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.strokeStyle = "#FFFFFF";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.strokeText("My Game", 400, 300);
}

function drawGameScreen() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  ctx.clearRect(0, 0, c.width, c.height);
        
  var grd = ctx.createLinearGradient(0,0,0,c.height);
  grd.addColorStop(0,"blue");
  grd.addColorStop(1,"white");

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.strokeStyle = "#000000";
  ctx.moveTo(0,0);
  ctx.lineTo(200,100);
  ctx.lineTo(50,50);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(95, 50, 40, 0, 2*Math.PI);
  ctx.fillStyle = "#FF00FF";
  ctx.fill();

  keyboardInput(player);
  drawCharacter(player);

  var numEnemies = enemies.length;

  for(var i = 0; i < numEnemies; i++)
  {
    drawCharacter(enemies[i]);
  }
}

function drawCharacter(character) {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  var img = document.getElementById("DrawImage");
  ctx.drawImage(img, character.posX, character.posY, 64, 64);
};

function stopUpdate() {
  if(update !== null)
  {
    window.clearInterval(update);
    update = null;
  }
}

function startUpdate() {
  update = window.setInterval(drawCanvas, 33);
  gameRunning = true;
}

function keyboardInput(player) {
  
  if(keysDown[37]) player.posX -= 1;
  if(keysDown[38]) player.posY -= 1;
  if(keysDown[39]) player.posX += 1;
  if(keysDown[40]) player.posY += 1;

}


function inputKeyDown(e) {
  console.log("Key Down: " + e.keyCode);

  keysDown[e.keyCode] = true;
}

function inputKeyUp(e) {
  console.log("Key Down: " + e.keyCode);

  keysDown[e.keyCode] = false;
}

function buttonHighlight(button) {
  console.log("highlight reset button " + button);

  button.style.color = "blue";
}

function buttonUnhighlight(button) {
  console.log("unhighlight reset button " + button);

  button.style.color = "red";
}



