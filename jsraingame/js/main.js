window.addEventListener("load", function (event) {
  "use strict";

  var score = 0;
  var keyDownUp = function (event) {
    controller.keyDownUp(event.type, event.keyCode);
  };

  var resize = function (event) {
    display.resize(
      document.documentElement.clientWidth - 32,
      document.documentElement.clientHeight - 32,
      game.world.height / game.world.width
    );
    display.render();
  };

  var endgame = function () {};

  var render = function () {
    if (game.world.gameover == false) {
      display.fill(game.world.background_color);
      display.drawRectangle(
        game.world.player.x,
        game.world.player.y,
        game.world.player.width,
        game.world.player.height,
        game.world.player.color
      );
      for (let i = 0; i < game.world.rain.length; i++) {
        display.drawRectangle(
          game.world.rain[i].x,
          game.world.rain[i].y,
          game.world.rain[i].width,
          game.world.rain[i].height,
          game.world.rain[i].color
        );
      }
      display.drawScore("Score: " + Math.floor(engine.time / 1000));
      display.drawDifficulty("Difficulty: " + game.world.dispDifficulty);

      display.render();
    }
  };

  var update = function () {
    if (game.world.gameover == false) {
      if (controller.left.active) {
        game.world.player.moveLeft();
      }
      if (controller.right.active) {
        game.world.player.moveRight();
      }
      if (controller.up.active) {
        game.world.player.moveUp();
      }
      if (controller.down.active) {
        game.world.player.moveDown();
      }

      if (
        Math.floor(engine.time / 1000) % 2 == 0 &&
        game.world.dispDifficulty < Math.floor(engine.time / 1000) / 2
      ) {
        game.world.increaseDifficulty();
      }
      game.update();
    } else {
      engine.stop();
      score = Math.floor(engine.time / 1000);
      display.popUp(score);
    }
  };

  var controller = new Controller();
  var display = new Display(document.getElementById("rain"));
  var game = new Game();
  var engine = new Engine(1000 / 60, render, update);

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
  window.addEventListener("resize", resize);

  resize();

  engine.start();
});
