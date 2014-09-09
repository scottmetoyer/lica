var Engine = (function () {
    "use strict";

    var sprite;
    var currentScene = null;
    var sceneFilename = null;

    // Native resolution is 1280 x 720, 16 x 9 aspect ratio
    var nativeWidth = 1280;
    var widthToHeight = 16 / 9;
    var scale = 1.0;

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

        // sprite.setScale(scale);
    }

    function initialize() {
        Scene.load("scripts/scenes/inside-store.js");
        resize();
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
        currentScene: function (x) {
            if (x) { currentScene = x; }
            return currentScene;
        }
    };
})();

window.addEventListener('load', Engine.initialize, false);
window.addEventListener('resize', Engine.resize, false);
window.addEventListener('orientationchange', Engine.resize, false);

// Bind canvas click events
var canvas = document.getElementById('canvas');
canvas.addEventListener('click', Engine.handleClick, false);