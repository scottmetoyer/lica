window.onload = function() {
  var interfaceVisible = false;
  var interfaceHeight = 60;
  var showInterface, hideInterface;

  var game = new Phaser.Game(640, 480, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  });

  function preload() {
    game.load.image('logo', './assets/backgrounds/phaser-logo-small.png');
    game.load.image('interface', './assets/backgrounds/interface.png');
  }

  function create() {
    game.input.mouse.capture = true;

    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);

    // Setup interface open animation
    var interfaceSlider = game.add.sprite(0, interfaceHeight * -1, 'interface');
    showInterface = game.add.tween(interfaceSlider).to({
      y: 0
    }, 500, Phaser.Easing.Exponential.In, false);
    hideInterface = game.add.tween(interfaceSlider).to({
      y: interfaceHeight * -1
    }, 500, Phaser.Easing.Exponential.Out, false);
  }

  function update() {
    var y = game.input.mousePointer.y;

    if (y < 10 && interfaceVisible === false) {
      interfaceVisible = true;
      showInterface.start();
    }

    if (y > interfaceHeight && interfaceVisible === true) {
      interfaceVisible = false;
      hideInterface.start();
    }
  }
};
