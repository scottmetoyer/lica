var OutsideStore = (function (options) {
    "use strict"

    var name = 'Outside Store';
    var background = 'outside-store.png';
    var navmeshJson = '{}';

    return {
        name: function () { return name; },
        background: function () { return background; },
        navmeshJson: function () { return navmeshJson; }
    };
})();

if (Engine != undefined) {
    Engine.addScene(OutsideStore);
}