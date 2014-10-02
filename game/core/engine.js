var Engine = (function () {
    "use strict";

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var currentScene = null;
    var hero = null;
    var objects = [];
    var scenes = [];
    var currentAction = "WALK";
    var scale = 1.0;

    function resize() {
        var content = document.getElementById('content');

        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > Game.widthToHeight()) {
            newWidth = newHeight * Game.widthToHeight();
            content.style.height = newHeight + 'px';
            content.style.width = newWidth + 'px';
        } else {
            newHeight = newWidth / Game.widthToHeight();
            content.style.width = newWidth + 'px';
            content.style.height = newHeight + 'px';
        }

        content.style.marginTop = (-newHeight / 2) + 'px';
        content.style.marginLeft = (-newWidth / 2) + 'px';

        var canvas = document.getElementById('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Compute global scale based on new width and apply to game objects
        scale = newWidth / Game.nativeWidth();

        for (var i = 0; i < objects.length; i++) {
            objects[i].scale(scale);
        }
    }

    function loadScene(scene) {
        Engine.currentScene(scene);
        canvas.style.backgroundImage = "url('assets/backgrounds/" + scene.background() + "')";
        resize();
    }

    function initialize() {
        // Bind events and setup the game
        window.addEventListener('load', Engine.initialize, false);
        window.addEventListener('resize', Engine.resize, false);
        window.addEventListener('orientationchange', Engine.resize, false);
        canvas.addEventListener('click', Engine.handleClick, false);

        // Load the first game scene
        loadScene(Game.startScene());

        // Start the main game loop
        loop();
    }

    function loop() {
        window.requestAnimationFrame(loop);

        // Update and draw game objects
        for (var i = 0; i < objects.length; i++) {
            objects[i].update(Date.now());
            objects[i].draw();
        }
    }

    function handleInterfaceClick(point) {
        var handled = false;
        return handled;
    }

    function handleObjectClick(point) {
        var handled = false;
        return handled;
    }

    function handleNavmeshClick(point) {
        var handled = false;

        if (currentAction == "WALK") {
            // TODO: Create a pathfinder and navigate hero to the destination
            hero.facePoint(point);
            hero.position(point);
            handled = true;
        }

        return handled;
    }

    function handleClick(event) {
        var x = event.layerX;
        var y = event.layerY;

        // Translate to game coordinates
        x = x / scale;
        y = y / scale;
        var point = new Vector2(x, y);

        if (handleInterfaceClick(point)) {
            event.preventDefault();
            return;
        }

        if (handleObjectClick(point)) {
            event.preventDefault();
            return;
        }

        if (handleNavmeshClick(point)) {
            event.preventDefault();
        }
    }

    function debug(message) {
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        context.fillStyle = 'blue';
        context.font = 'bold 16px Arial';
        context.fillText(message, 10, 20);
    }

    function addObject(object) {
        objects.push(object);
    }

    function addScene(scene) {
        scenes.push(scene);
    }

    return {
        initialize: initialize,
        resize: resize,
        handleClick: handleClick,
        addObject: addObject,
        addScene: addScene,
        hero: function (value) {
            if (value) { hero = value; }
            return value;
        },
        currentScene: function (x) {
            if (x) { currentScene = x; }
            return currentScene;
        },
        context: function () { return context; }
    };
})();