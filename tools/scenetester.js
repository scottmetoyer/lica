var Scenetester = (function () {
    "use strict"

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    function initialize() {
        loop();
    }

    function handleLoadScene(event) {
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