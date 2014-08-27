
function buttonHighlight(button) {
  console.log("highlight reset button " + button);

  button.style.color = "green";
};

function buttonUnhighlight(button) {
  console.log("unhighlight reset button " + button);

  button.style.color = "red";
};

var buttonControlFuncs = (function() {
  var update = null;
  var gameRunning = false;

  return {
    startUpdate: function() {
      update = window.setInterval(drawGameScreen, 33);
    
      if(!gameRunning)
      {
        initialiseGameState();
      }

      gameRunning = true;
    },

    stopUpdate: function() {
      if(update !== null)
      {
        window.clearInterval(update);
        update = null;
      }
    },

    reset: function() {
      player.reset();
      enemyInfo.reset();

      if (update === null && gameRunning)
      {
        drawGameScreen();
      }

      if(gameState.highScore < gameState.score)
      {
        gameState.highScore = gameState.score;

        var yourName = gameState.highScoreName !== "unknown" && gameState.highScoreName != "" ? gameState.highScoreName : "Your Name";

        gameState.highScoreName = prompt("You got a high score of " + gameState.highScore + " please enter your name!", yourName);

        if(gameState.highScoreName === null || gameState.highScoreName === undefined)
        {
          gameState.highScoreName = "unknown";
        }
      }

      gameState.score = 0;

      var cookie = "highscore=" + gameState.highScore + "; expires=Mon, 31 Dec 2020 12:00:00 UTC";
      document.cookie = cookie;

      var storage = window.localStorage;

      if(storage !== undefined)
      {
        storage.setItem("highscorename", gameState.highScoreName);
      }
    },

    clearHighScore: function() {
      document.cookie = "highscore=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

      var storage = window.localStorage;

      if(storage !== undefined)
      {
        console.log("my local storage is defined");
        storage.removeItem("highscorename");
      }

      gameState.highScore = 0;
      gameState.highScoreName = "unknown";
    }
  }
})();







