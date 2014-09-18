var Hero = (function (options) {
    "use strict"

    var name = 'Hero';
    var spritesheet = 'hero.png';

    return {
        name: function () { return name; },
        spritesheet: function () { return background; }
    };
})();