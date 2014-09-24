var Hero = (function (parameters) {
    "use strict"

    var name = 'Hero';
    var spritesheet = 'hero.png';

    return {
        name: function () { return name; },
        spritesheet: function () { return spritesheet; }
    };
})();