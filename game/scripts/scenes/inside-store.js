var InsideStore = (function (options) {
    const name = 'Inside Store';
    const background = 'inside-store.png';
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
    Engine.setCurrentScene(InsideStore);
}