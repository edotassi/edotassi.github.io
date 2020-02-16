(function() {
  function preloadInfo() {
    game.load.image("background", "assets/background.jpg");
  }

  function createInfo() {
    game.add.tileSprite(0, 0, 800, 600, "background");

    game.add.text(
      80,
      20,
      "Istruzioni:\n" +
        "Usa SU,GIU,SINISTRA,DESTRA per muovere la navicella\n" +
        "Premi SPAZIO per sparare\n" +
        "Evita i colpi sparati dagli alieni\n\n" +
        "Ogni secondo che passa il tuo punteggio totale verrà diminuito\n" +
        "Ogni volta che perdi una vita perdi 100 punti\n" +
        "Raccogli i bonus rilasciati dagli alieni per accumulare punti \no vite extra\n\n" +
        "Hai solo 3 vite a tua disposizione!\n\n\n" +
        "Premi SPAZIO per tornare al menu principale",
      {
        font: "25px Arial",
        fill: "#FFFFFF"
      }
    );

    game.input.keyboard
      .addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.addOnce(function() {
        game.state.start("menu");
      });
  }

  function updateInfo() {}

  function renderInfo() {}

  var gameState = {
    preload: preloadInfo,
    create: createInfo,
    update: updateInfo,
    render: renderInfo
  };

  game.state.add("info", gameState);
})();
