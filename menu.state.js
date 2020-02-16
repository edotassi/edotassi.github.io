(function() {
  function preloadMenu() {
    game.load.image("background", "assets/background.jpg");
  }

  function createMenu() {
    game.add.tileSprite(0, 0, 800, 600, "background");

    game.add.text(80, 80, "Eva Invaders", {
      font: "50px Arial",
      fill: "#FFFFFF"
    });
    game.add.text(80, game.world.height - 120, "Premi I per le istruzioni", {
      font: "25px Arial",
      fill: "#FFFFFF"
    });
    game.add.text(80, game.world.height - 80, "Premi SPAZIO per iniziare", {
      font: "25px Arial",
      fill: "#FFFFFF"
    });

    game.input.keyboard
      .addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.addOnce(function() {
        game.state.start("game");
      });

    game.input.keyboard.addKey(Phaser.Keyboard.I).onDown.addOnce(function() {
      game.state.start("info");
    });
  }

  function updateMenu() {}

  function renderMenu() {}

  var menuState = {
    preload: preloadMenu,
    create: createMenu,
    update: updateMenu,
    render: renderMenu
  };

  game.state.add("menu", menuState);
})();
