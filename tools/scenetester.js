var Scenetester = (function () {
    "use strict"

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var error = document.getElementById('errorMessage');
    var sceneFilename = null;

    function initialize() {
        Engine.initialize();
        loop();
    }

    function handleLoadScene(event) {
        var filename = document.getElementById('sceneFilename').value;
        var title = document.getElementById('filename');

        if (filename) {
            if (sceneFilename) {
                Scene.unload(sceneFilename);
            }

            filename = '../game/scripts/scenes/' + filename;
            Scene.load(filename);
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