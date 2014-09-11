var Scenetester = (function () {
    "use strict"

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var error = document.getElementById('errorMessage');
    var sceneFilename = null;

    function initialize() {
        // loop();
    }

    function handleLoadScene(event) {
        var filename = document.getElementById('sceneFilename').value;

        if (filename) {
            if (sceneFilename) {
                Scene.unload(sceneFilename);
            }

            filename = '../game/scripts/scenes/' + filename;
            Scene.load({
                filename: filename,
                done: function () {
                    // Set the background image
                    var canvas = document.getElementById('canvas');
                    canvas.style.backgroundImage = "url('../game/assets/scenes/" + Engine.currentScene().background() + "')";

                    // Set the canvas width
                    canvas.width = Game.nativeWidth();
                    canvas.height = Game.nativeWidth() / Game.widthToHeight();

                    // Set the scene title
                    var title = document.getElementById('fileName');
                    title.innerText = Engine.currentScene().name();
                }
            });

            sceneFilename = filename;
        } else {
            error.innerText = 'Please specify a filename';
        }
    }

    function loop() {
        window.requestAnimationFrame(loop);
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    }
    
    return {
        handleLoadScene: handleLoadScene,
        initialize: initialize
    };
})();

document.getElementById('loadScene').addEventListener('click', Scenetester.handleLoadScene, false);
window.addEventListener('load', Scenetester.initialize, false);