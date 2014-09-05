var Alleyway = (function (options) {
    const name = 'Alleyway';
    const background = 'alleyway.png';
    const navmesh = {};

    function getName() {
        return name;
    }

    function getBackground() {
        return background;
    }

    function getNavmesh() {
        return navmesh;
    }

    return {
        getName: getName,
        getBackground: getBackground,
        getNavmesh: getNavmesh
    };
})();

if (Engine) {
    Engine.setCurrentScene(Alleyway);
}