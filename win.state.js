(function() {
  function preloadWin() {
    game.load.image("background", "assets/background.jpg");
  }

  function createWin() {
    game.add.tileSprite(0, 0, 800, 600, "background");

    game.add.text(80, 80, "Complimenti hai vinto!", {
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

  function updateWin() {}

  function renderWin() {}

  var winState = {
    preload: preloadWin,
    create: createWin,
    update: updateWin,
    render: renderWin
  };

  game.state.add("win", winState);
})();
