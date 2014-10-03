var Actor = (function (parameters) {
    var state = "IDLE";
    var facing = "DOWN";
    var zindex = 0;
    var sprite = parameters.sprite;
    var step = parameters.step;
    var currentPosition = new Vector2(0, 0);
    var targetPosition = new Vector2(0, 0);
    var targetReached = null;
    var startPosition = null;

    // Parameters:
    // point: The Vector2 coordinates the actor will face
    function facePoint(point) {
        var theta = Math.atan2(point.y - currentPosition.y, point.x - currentPosition.x);
        if (theta < 0)
            theta += 2 * Math.PI;
        var angle = theta * 180 / Math.PI;

        if (angle >= 0 && angle < 45 || angle > 315 && angle <= 360) {
            facing = "EAST";
            sprite.animationIndex(3);
        } else if (angle >= 45 && angle < 135) {
            facing = "SOUTH";
            sprite.animationIndex(0);
        } else if (angle >= 135 && angle < 225) {
            facing = "WEST";
            sprite.animationIndex(1);
        } else if (angle >= 225 && angle < 315) {
            facing = "NORTH";
            sprite.animationIndex(2);
        }
    }

    // Parameters:
    // position: The Vector2 screen position to walk to
    // done: Callback executed after the actor reaches their destination
    function walkTo(parameters) {
        state = "WALK";
        targetPosition = parameters.position;
        startPosition = currentPosition;
        targetReached = parameters.done;
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
                if ((targetPosition.x >= currentPosition.x - step / 2) &&
                    (targetPosition.x <= currentPosition.x + step / 2 &&
                    (targetPosition.y >= currentPosition.y - step / 2) &&
                    targetPosition.y <= currentPosition.y +  step / 2)) {
                    state = "IDLE";
                    targetReached();
                } else {
                    // Get vector of the line
                    var lineVector = startPosition.subtract(targetPosition).normalize();
                    lineVector = lineVector.scale(step * -1);
                    currentPosition = lineVector.add(currentPosition);
                    sprite.position(currentPosition);
                }
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
            if (value != undefined) {
                currentPosition = value;
                sprite.position(currentPosition);
            }
            return currentPosition;
        },
        update: update,
        draw: draw,
        scale: function (value) {
            if (value != undefined) {
                sprite.scale(value);
            }
            return sprite.scale;
        }
    }
});