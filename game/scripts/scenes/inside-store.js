var InsideStore = (function (options) {
    "use strict"

    var name = 'Inside Store';
    var background = 'inside-store.png';
    var navmesh = {};

    return {
        name: function () { return name; },
        background: function () { return background; },
        navmesh: function () { return navmesh; }
    };
})();

if (Engine) {
    Engine.currentScene(InsideStore);
}