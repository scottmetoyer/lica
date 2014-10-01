var Sprite = (function (parameters) {
    "use strict";

    var context = Engine.context();
    var spriteSheet = parameters.spriteSheet;
    var width = parameters.width;
    var height = parameters.height;
    var interval = parameters.interval;
    var numberOfFrames = parameters.numberOfFrames;
    var currentScale = parameters.scale;
    var loop = parameters.loop;
    var currentPosition = new Vector2(0, 0);
    var currentAnimationIndex = 0;

    var lastUpdate = Date.now();
    var frameIndex = 0;

    var image = new Image();
    image.src = './assets/spritesheets/' + spriteSheet;

    function getAbsolutePosition() {
        return new Vector2(currentPosition.x * currentScale, currentPosition.y * currentScale);
    }

    function draw() {
        var pos = getAbsolutePosition();
        context.clearRect(pos.x, pos.y, width * currentScale, height * currentScale);

        // Draw the animation
        context.drawImage(
           image,
           frameIndex * width,
           currentAnimationIndex,
           width,
           height,
           pos.x,
           pos.y,
           width * currentScale,
           height * currentScale);
    }

    function update(gameTime) {
        // Milliseconds since last update
        var elapsed = (gameTime - lastUpdate);

        // Time to update the frame
        if (elapsed >= interval) {
            frameIndex++;

            if (frameIndex >= numberOfFrames[currentAnimationIndex]) {
                if (loop) {
                    frameIndex = 0;
                } else {
                    frameIndex = numberOfFrames[currentAnimationIndex] - 1;
                }
            }

            lastUpdate = gameTime;
        }
    }

    return {
        draw: draw,
        update: update,
        scale: function(value) {
            if (value) {
                currentScale = value;
            }
            return currentScale;
        },
        position: function (value) {
            if (value) {
                currentPosition = value;
            }
            return currentPosition;
        },
        animationIndex: function (value) {
            if (value) {
                currentAnimationIndex = value;
            }
            return currentAnimationIndex;
        }
    };
});