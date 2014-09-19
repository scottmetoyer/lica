var Teacup = (function (options) {
    "use strict"

    var name = 'Teacup';
    var spritesheet = 'hero.png';

    return {
        name: function () { return name; },
        spritesheet: function () { return spritesheet; }
    };
})();