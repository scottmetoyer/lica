var OutsideStore = (function (options) {
    "use strict"

    var name = 'Outside Store';
    var background = 'outside-store.png';
    var navmesh = {};

    return {
        name: function () { return name; },
        background: function () { return background; },
        navmesh: function () { return navmesh; }
    };
})();

if (Engine != undefined) {
    Engine.addScene(OutsideStore);
}