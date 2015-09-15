window.onload = function() {
  var interfaceVisible = false;
  var interfaceHeight = 35;
  var interfaceButtonGroup;
  var showInterface, hideInterface;

  // HVGA resolution to work better on wide devices and phones, 480 x 270, 16:9 aspect ratio
  var game = new Phaser.Game(480, 270, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  });

  function preload() {
    game.load.image('logo', './assets/backgrounds/phaser-logo-small.png');

    // Load the interface icons
    game.load.image('lookButton', './assets/interface/look_button.png');
    game.load.image('walkButton', './assets/interface/walk_button.png');
    game.load.image('talkButton', './assets/interface/talk_button.png');
    game.load.image('helpButton', './assets/interface/help_button.png');
    game.load.image('useButton', './assets/interface/use_button.png');
    game.load.image('optionsButton', './assets/interface/options_button.png');
    game.load.image('inventoryButton', './assets/interface/inventory_button.png');
    game.load.image('itemButton', './assets/interface/item_button.png');
  }

  function create() {
    game.input.mouse.capture = true;

    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);

    // Setup interface
    interfaceButtonGroup = game.add.group();

    var walkButton = game.make.button(0, 0, 'walkButton', null);
    var lookButton = game.make.button(60, 0, 'lookButton', null);
    var useButton = game.make.button(120, 0, 'useButton', null);
    var talkButton = game.make.button(180, 0, 'talkButton', null);
    var itemButton = game.make.button(240, 0, 'itemButton', null);
    var inventoryButton = game.make.button(300, 0, 'inventoryButton', null);
    var optionsButton = game.make.button(360, 0, 'optionsButton', null);
    var helpButton = game.make.button(420, 0, 'helpButton', null);

    interfaceButtonGroup.add(lookButton);
    interfaceButtonGroup.add(useButton);
    interfaceButtonGroup.add(walkButton);
    interfaceButtonGroup.add(talkButton);
    interfaceButtonGroup.add(helpButton);
    interfaceButtonGroup.add(optionsButton);
    interfaceButtonGroup.add(inventoryButton);
    interfaceButtonGroup.add(itemButton);

    showInterface = game.add.tween(interfaceButtonGroup).to({
      y: 0
    }, 500, Phaser.Easing.Exponential.In, false);
    hideInterface = game.add.tween(interfaceButtonGroup).to({
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
