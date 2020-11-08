
const Game = function() {

    this.world = {
  
      background_color:"rgba(255,255,255,1)",
      gameover: false,
      difficulty: 10,
      dispDifficulty: 0,
  
  
      player:new Game.Player(),
      rain: [new Game.Rain(100),new Game.Rain(60)],
  
      height:720,
      width:1080,
  
      collideObject:function(object) {
  
        if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
        if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
        else if (object.y + object.height > this.height) { object.y = this.height - object.height; object.velocity_y = 0; }
  
      },
      collideTwoObject:function(object1,object2){
          if (((object1.x <= object2.x) && (object1.x+object1.width) >= object2.x) && ((object1.y <= object2.y) && (object1.y+object1.width) >= object2.y)){
            this.gameover = true;
          }
      },
      increaseDifficulty:function(){
        if (this.difficulty != 1){
        this.difficulty--;
        this.dispDifficulty++;
        }
      },

  
      update:function() {
  
        this.player.update();
        for (let i = 0; i<this.rain.length; i++){
            this.rain[i].update();
        }
        this.collideObject(this.player);
        for (let i = 0; i<this.rain.length; i++){
            this.collideTwoObject(this.player, this.rain[i]);
        }
        // Checks difficulty for how much rain
        if ((Math.floor(Math.random() * 100) % this.difficulty) == 0){
          // Adds random rain
          this.rain.push(new Game.Rain(Math.floor(Math.random() * this.width)));
        }
  
      }
  
    };
  
    this.update = function() {
  
      this.world.update();
  
    };
  
  };
  
  Game.prototype = { constructor : Game };
  
  Game.Player = function(x, y) {
  
    this.color      = "#00ff00";
    this.height     = 35;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width      = 35;
    this.x          = 470;
    this.y          = 360;
  
  };
  
  Game.Player.prototype = {
  
    constructor : Game.Player,
  
    
  
    moveLeft:function()  { this.velocity_x -= 0.5; },
    moveRight:function() { this.velocity_x += 0.5; },
    moveUp:function() { this.velocity_y -= 0.5; },
    moveDown:function() { this.velocity_y += 0.5; },
  
    update:function() {
  
      this.x += this.velocity_x;
      this.y += this.velocity_y;
  
    }
  
  };
  Game.Rain = function(x){

    this.color = "#ff0000";
    this.velocity_y = 2;
    this.velocity_x = 0;
    this.y = 0;
    this.x = x;
    this.width = 10;
    this.height = 20;

  }
  Game.Rain.prototype = {
      constructor : Game.Rain,

      
      update:function() {
  
          this.x += this.velocity_x;
          this.y += this.velocity_y;
      
      }
  }
  