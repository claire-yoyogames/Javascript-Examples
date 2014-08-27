
window.onkeydown = inputKeyDown;
window.onkeyup = inputKeyUp;

var c = document.getElementById("myCanvas");
c.onmousemove = inputMouseMove;

function inputKeyDown(e) {
  console.log("Key Down: " + e.keyCode);

  if(e.keyCode >= 37 && e.keyCode <= 40)
  {
    gameState.keysDown[e.keyCode] = true;
    return false;
  }
};

function inputKeyUp(e) {
  console.log("Key Down: " + e.keyCode);

  if(e.keyCode >= 37 && e.keyCode <= 40)
  {
    gameState.keysDown[e.keyCode] = false;
    return false;
  }
};

function inputMouseMove(e) {
  gameState.mousePosition.x = e.offsetX;
  gameState.mousePosition.y = e.offsetY;
}

function keyboardInput(playerObj) {
  if(gameState.keysDown[37]) playerObj.posX -= playerObj.speed;
  if(gameState.keysDown[38]) playerObj.posY -= playerObj.speed;
  if(gameState.keysDown[39]) playerObj.posX += playerObj.speed;
  if(gameState.keysDown[40]) playerObj.posY += playerObj.speed;
};




