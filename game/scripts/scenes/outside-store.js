var OutsideStore = (function (options) {
    const name = 'Outside Store';
    const background = 'outside-store.png';
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
    Engine.setCurrentScene(OutsideStore);
}