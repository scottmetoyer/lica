var Alleyway = (function (options) {
    const name = "Alleyway";

    function hotspotClick(color) {

    }

    function getName() {
        return name;
    }

    return {
        hotspotClick: hotspotClick,
        getName: getName
    };
})();

// Set the current scene to this scene
Engine.setCurrentScene(Alleyway);