var Alleyway = (function (options) {
    "use strict"

    var name = 'Alleyway';
    var background = 'alleyway.png';
    var navmesh = '{}';

    return {
        name: function () { return name; },
        background: function () { return background; },
        navmeshJson: function () { return navmeshJson; }
    };
})();

if (Engine != undefined) {
    Engine.addScene(Alleyway);
}