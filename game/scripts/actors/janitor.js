var Janitor = (function (parameters) {
    "use strict"

    var name = 'Janitor';
    var spritesheet = 'janitor.png';

    return {
        name: function () { return name; },
        spritesheet: function () { return spritesheet; }
    };
})();