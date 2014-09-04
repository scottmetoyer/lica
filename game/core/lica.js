var Lica = (function () {
    "use strict";

    function loadScene(filename) {
        Engine.loadScene(filename);
    }

    function getCurrentScene() {
        return Engine.getCurrentScene();
    }

    function setCurrentScene(scene) {
        Engine.setCurrentScene(scene);
    }

    return {
        loadScene: loadScene,
        getCurrentScene: getCurrentScene,
        setCurrentScene: setCurrentScene
    };
})();