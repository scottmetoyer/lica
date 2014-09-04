var Engine = (function () {
    "use strict";

    var sprite;
    var currentScene = null;
    var sceneFilename = null;

    // Native resolution is 1280 x 720, 16 x 9 aspect ratio
    var nativeWidth = 1280;
    var widthToHeight = 16 / 9;
    var scale = 1.0;

    function getCurrentScene() {
        return currentScene;
    }

    function setCurrentScene(scene) {
        currentScene = scene;
    }

    function loadScene(filename) {
        // First, unload the existing scene
        if (currentScene) {
            unloadScene(sceneFilename);
        }

        var script = document.createElement('script')
        script.setAttribute("type", "text/javascript")
        script.setAttribute("src", filename)
        document.getElementsByTagName("head")[0].appendChild(script);

        // Set the background image
        // var canvas = document.getElementById('canvas');
        // canvas.style.backgroundImage = "url('assets/scenes/scene1.png')";
    }

    function unloadScene(filename) {
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length; i >= 0; i--) {
            if (scripts[i] && scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').indexOf(filename) != -1)
                scripts[i].parentNode.removeChild(scripts[i]);
        }
    }

    function resize() {
        var content = document.getElementById('content');

        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
            content.style.height = newHeight + 'px';
            content.style.width = newWidth + 'px';
        } else {
            newHeight = newWidth / widthToHeight;
            content.style.width = newWidth + 'px';
            content.style.height = newHeight + 'px';
        }

        content.style.marginTop = (-newHeight / 2) + 'px';
        content.style.marginLeft = (-newWidth / 2) + 'px';

        var canvas = document.getElementById('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Compute global scale based on new width and apply to game objects
        scale = newWidth / nativeWidth;

        sprite.setScale(scale);
    }

    function initialize() {
        // Test load a scene
        loadScene();

        var image = new Image();
        image.src = "assets/actors/hero.png";

        image.onload = function () {
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');

            sprite = Sprite({
                context: context,
                spriteSheet: image,
                width: 262,
                height: 513,
                interval: 120,
                numberOfFrames: 8,
                scale: scale,
                loop: true,
                position: { X: 0, Y: 0 }
            });

            // Resize the screen to fit the viewport
            resize();
        };

        loop();
    }

    function loop() {
        window.requestAnimationFrame(loop);

        // Update and game objects
        if (sprite) {
            sprite.update(Date.now());
            sprite.draw();
        }
    }

    function handleClick(event) {
        var x = event.layerX;
        var y = event.layerY;

        // Translate to game coordinates
        x = x / scale;
        y = y / scale;

        debug('x: ' + x + ', y: ' + y + ', scl: ' + scale);

        if (sprite) {
            sprite.setPosition({ X: x, Y: y });
        }

        event.preventDefault();
    }

    function debug(message) {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        context.fillStyle = 'blue';
        context.font = 'bold 16px Arial';
        context.fillText(message, 10, 20);
    }

    return {
        initialize: initialize,
        resize: resize,
        handleClick: handleClick,
        loadScene: loadScene,
        getCurrentScene: getCurrentScene,
        setCurrentScene: setCurrentScene
    };
})();

function start() {
    window.addEventListener('load', Engine.initialize, false);
    window.addEventListener('resize', Engine.resize, false);
    window.addEventListener('orientationchange', Engine.resize, false);

    // Bind canvas click events
    var canvas = document.getElementById('canvas');
    canvas.addEventListener('click', Engine.handleClick, false);
}