var Actor = (function (parameters) {
    var state = "IDLE";
    var facing = "DOWN";
    var sprite;
    
    var position = new Vector2(0, 0);

    // Parameters:
    // position: The Vector2 screen position to walk to
    // done: Callback executed after the actor reaches their destination
    function walkTo(parameters) {
    }

    // Parameters:
    // name: The name of the animation to play
    // loop: Loop the animation? True or false.
    // done: Callback executed when the animation is done playing, or after one loop for looped animations
    function playAnimation(parameters) {
    }

    // Parameters:
    // value: A Vector2 position value
    function position(value) {
        if (value) {
            position = value;
        }

        alert("Clciked the nav map!");

        return position;
    }

    // Parameters:
    function update(parameters) {
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


    return {
        walkTo: walkTo,
        playAnimation: playAnimation,
        position: position,
        update: update
    }
});