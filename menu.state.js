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
    game.add.text(80, game.world.height - 80, "Premi SPAZIO per iniziare", {
      font: "25px Arial",
      fill: "#FFFFFF"
    });

    game.add.text(
      80,
      game.world.height - 300,
      "Istruzioni:\nUsa le frecce direzionali per muovere la navicella\nSpazio per sparare\nEvita i colpi sparati dagli alieni\nHai solo 3 vite a tua disposizione!",
      {
        font: "25px Arial",
        fill: "#FFFFFF"
      }
    );

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    spaceKey.onDown.addOnce(function() {
      game.state.start("game");
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
