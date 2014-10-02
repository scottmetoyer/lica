var Actor = (function (parameters) {
    var state = "IDLE";
    var facing = "DOWN";
    var zindex = 0;
    var sprite = parameters.sprite;
    var currentPosition = new Vector2(0, 0);

    // Parameters:
    // point: The Vector2 coordinates the actor will face
    function facePoint(point) {
        var theta = Math.atan2(point.y - currentPosition.y, point.x - currentPosition.x);
        if (theta < 0)
            theta += 2 * Math.PI;
        var angle = theta * 180 / Math.PI;

        if (angle >= 0 && angle < 90) {
            facing = "EAST";
            sprite.animationIndex(3);
        } else if (angle >= 90 && angle < 180) {
            facing = "NORTH";
            sprite.animationIndex(2);
        } else if (angle >= 180 && angle < 270) {
            facing = "EAST";
            sprite.animationIndex(1);
        } else if (angle >= 270 && angle < 360) {
            facing = "SOUTH";
            sprite.animationIndex(0);
        }
    }

    // Parameters:
    // position: The Vector2 screen position to walk to
    // done: Callback executed after the actor reaches their destination
    function walkTo(parameters) {
        state = "WALK";
    }

    // Parameters:
    // name: The name of the animation to play
    // loop: Loop the animation? True or false.
    // done: Callback executed when the animation is done playing, or after one loop for looped animations
    function playAnimation(parameters) {
    }

    // Parameters:
    function update(gameTime) {
        switch (state) {
            case "IDLE":
                break;

            case "WALK":
                break;

            case "ANIMATE":
                break;

            default:
                break;
        }
    }

    function draw() {
        sprite.draw();
    }

    return {
        walkTo: walkTo,
        facePoint: facePoint,
        playAnimation: playAnimation,
        position: function (value) {
            if (value) {
                currentPosition = value;
                sprite.position(currentPosition);
            }
            return currentPosition;
        },
        update: update,
        draw: draw,
        scale: function (value) {
            if (value) {
                sprite.scale(value);
            }
            return sprite.scale;
        }
    }
});