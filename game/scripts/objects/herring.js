var Herring = (function (options) {
    "use strict"

    var name = 'Red Herring';
    var spritesheet = 'herring.png';

    return {
        name: function () { return name; },
        spritesheet: function () { return spritesheet; }
    };
})();