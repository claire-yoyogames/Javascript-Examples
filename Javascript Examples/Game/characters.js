
function Character(x, y, speed, size) {
  this.posX = x;
  this.posY = y;
  this.speed = speed;
  this.size = size;
  this.selectedTime = null;

  var startX = x;
  var startY = y;

  this.reset = function() {
    this.posX = startX;
    this.posY = startY;
  };
}

function Enemy(data) {
  Character.call(this, data.posX, data.posY, data.speed, data.size);
  var direction = 1;

  this.updateEnemy = function() {
    var c = document.getElementById("myCanvas");
    this.posX += this.speed * direction;

    var adjustedWidth = c.width - this.size;
    if(this.posX > adjustedWidth)
    {
      this.changeDirection(adjustedWidth);
    }
    else if (this.posX < 0)
    {
      this.changeDirection(0);
    }
  };

  this.changeDirection = function(newPosX) {
    this.posX = newPosX;
    direction *= -1;

    var bounce = document.getElementById("Bounce");
    bounce.load();
    bounce.play();
  };
}

Enemy.prototype = new Character();

var player = new Character(100, 100, 1, 64);

var enemyInfo = (function() {
  var enemyList = [];
  
  return {
    onReceiveEnemyInfo: function(enemyDataObject) {
      //var enemyDataObject = JSON.parse(enemyData);
      var numEnemies = enemyDataObject.enemyList.length;

      for (var i = 0; i < numEnemies; i++)
      {
        enemyList[i] = new Enemy(enemyDataObject.enemyList[i]);
      }  
    },

    initialise: function() {
      var xmlhttp = new XMLHttpRequest();
      var url = "Assets/enemies.txt";

      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
        {
          var myArr = JSON.parse(xmlhttp.responseText);
          enemyInfo.onReceiveEnemyInfo(myArr);
        }
      }

      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    },

    update: function() {
      var numEnemies = enemyList.length;

      for(var i = 0; i < numEnemies; i++)
      {
        enemyList[i].updateEnemy();
        drawCharacter(enemyList[i]);
      }
    }
  }
})();





