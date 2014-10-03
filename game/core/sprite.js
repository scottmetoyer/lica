var Sprite = (function (parameters) {
    "use strict";

    var context = Engine.context();
    var spriteSheet = parameters.spriteSheet;
    var width = parameters.width;
    var height = parameters.height;
    var interval = parameters.interval;
    var numberOfFrames = parameters.numberOfFrames;
    var currentScale = parameters.scale;
    var currentLoop = parameters.loop;
    var currentPosition = new Vector2(0, 0);
    var currentAnimationIndex = 0;

    var lastUpdate = Date.now();
    var frameIndex = 0;

    var image = new Image();
    image.src = './assets/spritesheets/' + spriteSheet;

    function getDrawPosition() {
        var pos = new Vector2(currentPosition.x * currentScale, currentPosition.y * currentScale);
        pos.x = pos.x - ((width * currentScale) / 2);
        pos.y = pos.y - (height * currentScale);
        return pos;
    }

    function clear() {
        var pos = getDrawPosition();
        context.clearRect(pos.x, pos.y, width * currentScale, height * currentScale);
    }

    function draw() {
        clear();

        // Offset to bottom middle of the sprite, scaled by current scale factor
        var pos = getDrawPosition();

        // Draw the animation
        context.drawImage(
           image,
           frameIndex * width,
           currentAnimationIndex * height,
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
                if (currentLoop) {
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
        loop: function(value) {
            if (value != undefined) {
                currentLoop = value;
            }
            return currentLoop;
        },
        scale: function(value) {
            if (value != undefined) {
                currentScale = value;
            }
            return currentScale;
        },
        position: function (value) {
            if (value != undefined) {
                clear();
                currentPosition = value;
            }
            return currentPosition;
        },
        animationIndex: function (value) {
            if (value != undefined) {
                currentAnimationIndex = value;
            }
            return currentAnimationIndex;
        }
    };
});