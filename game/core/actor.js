var Actor = (function (parameters) {
    var state = "IDLE";
    var facing = "DOWN";
    var zindex = 0;
    var sprite = parameters.sprite;
    var step = parameters.step;
    var path = null;
    var pathIndex = 0;
    var currentAbsolutePosition = new Vector2(0, 0);
    var targetPosition = new Vector2(0, 0);
    var targetReached = null;
    var startPosition = null;
    var animationIndex = 0;

    // Parameters:
    // point: The Vector2 coordinates the actor will face
    function facePoint(point) {
        var theta = Math.atan2(point.y - currentAbsolutePosition.y, point.x - currentAbsolutePosition.x);
        if (theta < 0)
            theta += 2 * Math.PI;
        var angle = theta * 180 / Math.PI;

        if (angle >= 0 && angle < 45 || angle > 315 && angle <= 360) {
            facing = "EAST";
            animationIndex = 3;
        } else if (angle >= 45 && angle < 135) {
            facing = "SOUTH";
            animationIndex = 0;
        } else if (angle >= 135 && angle < 225) {
            facing = "WEST";
            animationIndex = 1;
        } else if (angle >= 225 && angle < 315) {
            facing = "NORTH";
            animationIndex = 2;
        }

        sprite.animationIndex(animationIndex);
    }

    // Parameters:
    // position: The Vector2 screen position to walk to
    // done: Callback executed after the actor reaches their destination
    function walkTo(parameters) {
        state = "WALK";
        targetPosition = parameters.position;
        startPosition = currentAbsolutePosition;

        if (parameters.done != undefined) {
            targetReached = parameters.done;
        }

        sprite.playAnimation(animationIndex, true);
    }

    // Parameters:
    // path: A list of Vector2 screen positions to walk to in sequence
    // done: Callback executed after the actor reaches their destination
    function walkPath(parameters) {
        state = "WALK";
        path = parameters.path;
        pathIndex = 0;
        targetPosition = path[path.length - 1];
        startPosition = path[0];

        if (parameters.done != undefined) {
            targetReached = parameters.done;
        }

        sprite.playAnimation(animationIndex, true);
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
                if ((targetPosition.x >= currentAbsolutePosition.x - step / 2) &&
                    (targetPosition.x <= currentAbsolutePosition.x + step / 2 &&
                    (targetPosition.y >= currentAbsolutePosition.y - step / 2) &&
                    targetPosition.y <= currentAbsolutePosition.y + step / 2)) {
                    state = "IDLE";
                    
                    if (targetReached != undefined) {
                        targetReached();
                    }

                    sprite.stopAnimation(true);
                } else {
                    // Get vector of the line
                    var lineVector = startPosition.subtract(targetPosition).normalize();
                    lineVector = lineVector.scale(step * -1);
                    currentAbsolutePosition = lineVector.add(currentAbsolutePosition);
                    sprite.position(currentAbsolutePosition);
                }
                break;

            case "ANIMATE":
                break;

            default:
                break;
        }

        sprite.update(Date.now());
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
                currentAbsolutePosition = value;
                sprite.position(currentAbsolutePosition);
            }
            return currentAbsolutePosition;
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