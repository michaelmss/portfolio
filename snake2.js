
var framerate = 10;
var velocity_x = 0;
var velocity_y = 0;
var player_x = 10;
var player_y = 10;
var apple_x = 15;
var apple_y = 15;
var trail = [];
var score = 0;
var tail_length = 1;
var grid_size = 20;
var tile_size = canv.width / grid_size;
var rains = [];


class rain {
    constructor() {
      this.x = getRandomInt(20);
      this.y = 0;
    }
    moveDown(){
        this.y++;
    }
    x(){
        return this.x;
    }
    y(){
        return this.y
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
window.onload = function(){
    canv = document.getElementById("snakey");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", controllor);
    setInterval(game,1000/framerate)
}

function game(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canv.width,canv.height);
    rains.push(new rain());

    ctx.fillStyle = "lightblue";
    for(var i = 0; i< rains.length;i++){
        ctx.fillRect(rains[i].x*tile_size,rains[i].y*tile_size,tile_size,tile_size);
        if(player_x==rains[i].x && player_y==rains[i].y){
            score = 0;
        }
        rains[i].moveDown();
    }
    
    player_x += velocity_x;
    player_y += velocity_y;
    rains.forEach(element=>function(){
    })
    if(player_x > grid_size-1){
        player_x = 0;
    }
    if(player_y > grid_size-1){
        player_y = 0;
    }
    if(player_x < 0){
        player_x = grid_size-1;
    }
    if(player_y < 0){
        player_y = grid_size-1;
    }

    ctx.fillStyle = "pink";
    for(var i = 0; i<trail.length;i++){
        ctx.fillRect(trail[i].x*tile_size,trail[i].y*tile_size,tile_size,tile_size);
        if(player_x == trail[i].x && player_y == trail[i].y){
            tail_length = 1;
        }
    }
    trail.push({x:player_x,y:player_y});
    while (tail_length < trail.length){
        trail.shift();
    }

    ctx.fillStyle = "red";
    if(player_x == apple_x && player_y == apple_y){
        apple_x = Math.floor(Math.random()*grid_size);
        apple_y = Math.floor(Math.random()*grid_size);
        score++;
    }
    ctx.fillRect(apple_x*tile_size,apple_y*tile_size,tile_size,tile_size);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Score: "+ (score), 20,30);
}


function controllor(evt){
    switch(evt.keyCode){
        case 37:
            velocity_x = -1;
            velocity_y = 0;
            break;
        case 38:
            velocity_x = 0;
            velocity_y = -1;
            break;
        case 39:
            velocity_x = 1;
            velocity_y = 0;
            break;
        case 40:
            velocity_x = 0;
            velocity_y = 1;
            break;
    }
}