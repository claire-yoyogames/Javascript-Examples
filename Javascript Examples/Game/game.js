
window.onload = drawSplashScreen;
//window.setTimeout(stopUpdate, 5000);

var gameState = {
  mousePosition: {x: -1, y: -1 },
  keysDown: [],
  score: 0,
  highScore: 0,
  highScoreName: "unknown"
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

  ctx.fillStyle = "#000000";
  ctx.font = "12px Arial";
  ctx.textAlign = "left";
  ctx.fillText("High Score: " + gameState.highScore + " by " + gameState.highScoreName, 10, 20);
  ctx.fillText("Score: " + gameState.score, 10, 40);

  keyboardInput(player);
  drawCharacter(player);

  enemyInfo.update();

  var dynamicCanvas = document.getElementById("Dynamic Canvas");
  var dynamicContext = dynamicCanvas.getContext("2d");

  dynamicContext.drawImage(c, 0, 0);
}

function drawCharacter(character) {
  var c = document.getElementById("myCanvas");
  var recolour = document.getElementById("Recolour Canvas");
  var ctx = c.getContext("2d");
  var recolourCtx = recolour.getContext("2d");
  var selected = false;

  var mouse = gameState.mousePosition;

  if((character.posX <= mouse.x) && ((character.posX + character.size) >= mouse.x) && (character.posY <= mouse.y) && ((character.posY + character.size) >= mouse.y))
  {
    selected = true;
    gameState.score++;
  } 

  var img = document.getElementById("Face");
  var cropX = selected ? img.width * 0.5 : 0;

  recolourCtx.clearRect(0, 0, recolour.width, recolour.height);
  recolourCtx.drawImage(img, cropX, 0, img.width * 0.5, img.height, 0, 0, recolour.width, recolour.height);

  if(selected)
  {
    var currentDate = new Date();

    if(character.selectedTime === null)
    { 
      character.selectedTime = currentDate.getTime();
    }

    var imageData = recolourCtx.getImageData(0, 0, recolour.width, recolour.height);
    var pixelData = imageData.data;
    var dataLength = pixelData.length;

    var blend = [255, 0, 0];

    var timePassedMS = currentDate.getTime() - character.selectedTime;
    console.log("elapsed " + timePassedMS);
    var blendAmount = Math.min(0.8, (timePassedMS / 1000));
    
    for(var i = 0; i+4 < dataLength; i+=4)
    {
      if(pixelData[i+4] > 0)
      {
        for(var j = 0; j < 3; j++)
        {
          pixelData[i+j] = Math.floor((pixelData[i+j] * (1 - blendAmount)) + (blend[j] * blendAmount));
        }
      }
    }

    recolourCtx.clearRect(0, 0, recolour.width, recolour.height);
    recolourCtx.putImageData(imageData, 0, 0);
  }
  else
  {
    character.selectedTime = null;
  }

  ctx.drawImage(recolour, character.posX, character.posY, character.size, character.size);
};

function initialiseGameState() {
  console.log("cookie string: " + document.cookie);
  var cookies = document.cookie.split(';');
  var numCookies = cookies.length;
  var cookieName = "highscore=";
  
  for(var i = 0; i < numCookies; i++)
  {
    var cookie = cookies[i];
    while (cookie.charAt(0) === ' ') c = c.substring(1);

    if(cookie.indexOf(cookieName) != -1) 
    {
      var cookieResult = cookie.substring(cookieName.length,cookie.length);
      console.log("cookie is " + cookieResult);
      gameState.highScore = Number(cookieResult);
    }
  }

  var storage = window.localStorage;

  console.log(storage);

  if(storage !== undefined)
  {
    console.log("my local storage is defined");
    gameState.highScoreName = storage.highscorename !== undefined ? storage.highscorename : "unknown";
  }

  var recolourCanvas = document.createElement('canvas');
  recolourCanvas.id = "Recolour Canvas";
  recolourCanvas.width = 100;
  recolourCanvas.height = 100;
  recolourCanvas.style.display = "none";

  document.body.appendChild(recolourCanvas);

  var br = document.createElement('br');
  document.body.appendChild(br);

  var canvas = document.createElement('canvas');
  canvas.id = "Dynamic Canvas";
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.border = "1px solid #000000";
  canvas.style.position = "a";

  var ctx = canvas.getContext("2d");
  ctx.translate(0, canvas.height);
  ctx.scale(1, -1);

  document.body.appendChild(canvas);

  enemyInfo.initialise();
}





