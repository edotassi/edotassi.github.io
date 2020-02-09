(function() {
  function preloadLose() {
    game.load.image("background", "assets/background.jpg");
  }

  function createLose() {
    game.add.tileSprite(0, 0, 800, 600, "background");

    game.add.text(80, 80, "Hai perso!", {
      font: "50px Arial",
      fill: "#FFFFFF"
    });

    game.add.text(80, 370, "Premi M per tornare al menu", {
      font: "50px Arial",
      fill: "#FFFFFF"
    });

    game.add.text(80, 450, "Premi SPAZIO per giocare\ndi nuovo", {
      font: "50px Arial",
      fill: "#FFFFFF"
    });

    game.input.keyboard
      .addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.addOnce(function() {
        game.state.start("game");
      });

    game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.addOnce(function() {
      game.state.start("menu");
    });
  }

  function updateLose() {}

  function renderLose() {}

  var winState = {
    preload: preloadLose,
    create: createLose,
    update: updateLose,
    render: renderLose
  };

  game.state.add("lose", winState);
})();
