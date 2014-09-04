var Scenetester = (function () {
    "use strict"

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var message = document.getElementById('errorMessage');

    function initialize() {
        loop();
    }

    function handleLoadScene(event) {
        var filename = document.getElementById('sceneFilename').value;

        if (filename) {
            Engine.loadScene('../game/scripts/scenes/' + filename);
        } else {
            message.innerText = 'Please specify a filename';
        }
    }

    function loop() {
        window.requestAnimationFrame(loop);
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    }
    sceneFilename
    return {
        handleLoadScene: handleLoadScene,
        initialize: initialize
    };
})();

document.getElementById('loadScene').addEventListener('click', Scenetester.handleLoadScene, false);
window.addEventListener('load', Scenetester.initialize, false);