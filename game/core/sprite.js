var Sprite = (function (options) {
    "use strict";

    var context = options.context;
    var spriteSheet = options.spriteSheet;
    var width = options.width;
    var height = options.height;
    var interval = options.interval;
    var numberOfFrames = options.numberOfFrames;
    var scale = options.scale;
    var loop = options.loop;
    var position = { X: 0, Y: 0 };

    var lastUpdate = Date.now();
    var frameIndex = 0;

    function getScale() {
        return scale;
    }

    function setScale(value) {
        scale = value;
    }

    function getPosition() {
        return position;
    }

    function setPosition(value) {
        position = value;
    }

    function getAbsolutePosition() {
        return { X: position.X * scale, Y: position.Y * scale };
    }

    function draw() {
        var pos = getAbsolutePosition();

        context.clearRect(pos.X, pos.Y, width * scale, height * scale);

        // Draw the animation
        context.drawImage(
           spriteSheet,
           frameIndex * width,
           0,
           width,
           height,
           pos.X,
           pos.Y,
           width * scale,
           height * scale);
    }

    function update(gameTime) {
        // Milliseconds since last update
        var elapsed = (gameTime - lastUpdate);

        // Time to update the frame
        if (elapsed >= interval) {
            frameIndex++;

            if (frameIndex >= numberOfFrames) {
                if (loop) {
                    frameIndex = 0;
                } else {
                    frameIndex = numberOfFrames - 1;
                }
            }

            lastUpdate = gameTime;
        }
    }

    return {
        draw: draw,
        update: update,
        getScale: getScale,
        setScale: setScale,
        setPosition: setPosition,
        getPosition: getPosition
    };
});