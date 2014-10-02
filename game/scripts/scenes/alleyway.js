var Alleyway = (function (options) {
    "use strict"

    var name = 'Alleyway';
    var background = 'alleyway.png';
    var navmesh = {};

    return {
        name: function () { return name; },
        background: function () { return background; },
        navmesh: function () { return navmesh; }
    };
})();

if (Engine != undefined) {
    Engine.addScene(Alleyway);
}