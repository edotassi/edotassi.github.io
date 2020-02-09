(function() {
  var player;
  var aliens;
  var bullets;
  var bulletTime = 0;
  var bulletTimeDelta = 500;
  var cursors;
  var fireButton;
  var explosions;
  var starfield;
  var score = 0;
  var timeScore = 0;
  var scoreLossPerSec = 5;
  var scoreString = "";
  var scoreText;
  var lives;
  var enemyBullet;
  var firingTimer = 0;
  var firingTimerDelta = 5000;
  var stateText;
  var livingEnemies = [];
  var cycles = 1;
  var timeGameStart;

  function preloadGame() {
    game.load.image("bullet", "assets/bullet.png");
    game.load.image("enemyBullet", "assets/enemy-bullet.png");
    game.load.spritesheet("invader", "assets/invader32x32x4.png", 32, 32);
    game.load.image("ship", "assets/player.png");
    game.load.spritesheet("kaboom", "assets/explode.png", 128, 128);
    game.load.image("starfield", "assets/starfield.png");
    game.load.image("background", "assets/background2.png");
  }

  function createGame() {
    score = 0;
    timeGameStart = new Date().getTime();

    game.physics.startSystem(Phaser.Physics.ARCADE);

    starfield = game.add.tileSprite(0, 0, 800, 600, "starfield");

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, "bullet");
    bullets.setAll("anchor.x", 0.5);
    bullets.setAll("anchor.y", 1);
    bullets.setAll("outOfBoundsKill", true);
    bullets.setAll("checkWorldBounds", true);

    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, "enemyBullet");
    enemyBullets.setAll("anchor.x", 0.5);
    enemyBullets.setAll("anchor.y", 1);
    enemyBullets.setAll("outOfBoundsKill", true);
    enemyBullets.setAll("checkWorldBounds", true);

    player = game.add.sprite(400, 500, "ship");
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);

    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    createAliens();

    scoreString = "Punteggio : ";
    scoreText = game.add.text(10, 10, scoreString + score, {
      font: "34px Arial",
      fill: "#fff"
    });

    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, "Vite : ", {
      font: "34px Arial",
      fill: "#fff"
    });

    stateText = game.add.text(game.world.centerX, game.world.centerY, " ", {
      font: "84px Arial",
      fill: "#fff"
    });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (var i = 0; i < 3; i++) {
      var ship = lives.create(game.world.width - 100 + 30 * i, 60, "ship");
      ship.anchor.setTo(0.5, 0.5);
      ship.angle = 90;
      ship.alpha = 0.4;
    }

    explosions = game.add.group();
    explosions.createMultiple(30, "kaboom");
    explosions.forEach(setupInvader, this);

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.input.keyboard.addKey(Phaser.Keyboard.E).onDown.addOnce(function() {
      game.state.start("menu");
    });
  }

  function createAliens() {
    for (var y = 0; y < 4; y++) {
      for (var x = 0; x < 10; x++) {
        var alien = aliens.create(x * 48, y * 50, "invader");
        alien.anchor.setTo(0.5, 0.5);
        alien.animations.add("fly", [0, 1, 2, 3], 20, true);
        alien.play("fly");
        alien.body.moves = false;
      }
    }

    aliens.x = 100;
    aliens.y = 50;

    var tween = game.add
      .tween(aliens)
      .to({ x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    tween.onLoop.add(descend, this);
  }

  function setupInvader(invader) {
    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add("kaboom");
  }

  function descend() {
    aliens.y += 10;
  }

  function updateGame() {
    cycles++;
    starfield.tilePosition.y += 2;

    var now = new Date().getTime();
    scoreLossPerSec = parseInt(((now - timeGameStart) / 1000) * 5);

    scoreText.text = scoreText.text =
      scoreString + Math.max(0, score - scoreLossPerSec);

    if (player.alive) {
      player.body.velocity.setTo(0, 0);

      if (cursors.left.isDown && player.body.x >= 0) {
        player.body.velocity.x = -200;
      } else if (cursors.right.isDown && player.body.x <= 770) {
        player.body.velocity.x = 200;
      } else if (cursors.up.isDown && player.body.y >= 0) {
        player.body.velocity.y = -200;
      } else if (cursors.down.isDown && player.body.y <= 570) {
        player.body.velocity.y = 200;
      }

      if (fireButton.isDown) {
        fireBullet();
      }

      if (game.time.now > firingTimer) {
        enemyFires();
      }

      game.physics.arcade.overlap(
        bullets,
        aliens,
        collisionHandler,
        null,
        this
      );
      game.physics.arcade.overlap(
        enemyBullets,
        player,
        enemyHitsPlayer,
        null,
        this
      );
      game.physics.arcade.overlap(player, aliens, playerHitsEnemy, null, this);
    }
  }

  function renderGame() {}

  function collisionHandler(bullet, alien) {
    bullet.kill();
    alien.kill();

    score += 20;
    scoreText.text = scoreString + Math.max(0, score - scoreLossPerSec);

    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play("kaboom", 30, false, true);

    if (aliens.countLiving() == 0) {
      endGame("win", Math.max(0, score - scoreLossPerSec));
    }
  }

  function playerHitsEnemy(player, enemy) {
    enemy.kill();

    live = lives.getFirstAlive();

    if (live) {
      live.kill();
    }

    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play("kaboom", 30, false, true);

    if (lives.countLiving() < 1) {
      game.state.start("lose");
    } else {
      player.body.x = 400;
      player.body.y = 500;
    }
  }

  function enemyHitsPlayer(player, bullet) {
    bullet.kill();

    live = lives.getFirstAlive();

    score -= 100;

    if (live) {
      live.kill();
    }

    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play("kaboom", 30, false, true);

    if (lives.countLiving() < 1) {
      endGame("lose");
    }
  }

  function enemyFires() {
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length = 0;

    aliens.forEachAlive(function(alien) {
      livingEnemies.push(alien);
    });

    if (enemyBullet && livingEnemies.length > 0) {
      var random = game.rnd.integerInRange(0, livingEnemies.length - 1);

      var shooter = livingEnemies[random];
      enemyBullet.reset(shooter.body.x, shooter.body.y);

      game.physics.arcade.moveToObject(enemyBullet, player, 120);
      firingTimerDelta = firingTimerDelta / Math.log(cycles / 100);
      firingTimer = game.time.now + firingTimerDelta;
    }
  }

  function fireBullet() {
    if (game.time.now > bulletTime) {
      score -= 1;

      bullet = bullets.getFirstExists(false);

      if (bullet) {
        bullet.reset(player.x, player.y + 8);
        bullet.body.velocity.y = -400;
        bulletTime = game.time.now + bulletTimeDelta;
      }
    }
  }

  function resetBullet(bullet) {
    bullet.kill();
  }

  function restart() {
    lives.callAll("revive");
    aliens.removeAll();
    createAliens();

    player.revive();
    stateText.visible = false;
  }

  function endGame(state, score) {
    if (state === "win") {
      var nick = prompt("Inserisci il tuo nickname:");

      var ranking = JSON.parse(localStorage.getItem("ranking") || "[]");

      ranking.push({ nick, score });

      ranking.sort(function(left, right) {
        return right.score - left.score;
      });

      ranking = ranking.slice(0, 10);

      localStorage.setItem("ranking", JSON.stringify(ranking));
    }

    game.state.start(state);
  }

  var gameState = {
    preload: preloadGame,
    create: createGame,
    update: updateGame,
    render: renderGame
  };

  game.state.add("game", gameState);
})();
