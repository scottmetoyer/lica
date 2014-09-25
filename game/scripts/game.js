var Game = (function () {
    var nativeWidth = 1280;
    var widthToHeight = 16 / 9;
    var heroScript = "scripts/actors/hero.js";
    var startScene = "scripts/scenes/inside-store.js"

    return {
        nativeWidth: function () { return nativeWidth; },
        widthToHeight: function () { return widthToHeight; },
        heroScript: function () { return heroScript; },
        startScene: function () { return startScene; }
    };
})();