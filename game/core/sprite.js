var Sprite = (function (parameters) {
    "use strict";

    var context = parameters.context;
    var spriteSheet = parameters.spriteSheet;
    var width = parameters.width;
    var height = parameters.height;
    var interval = parameters.interval;
    var numberOfFrames = parameters.numberOfFrames;
    var scale = parameters.scale;
    var loop = parameters.loop;
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