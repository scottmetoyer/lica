var Janitor = (function (parameters) {
    "use strict"

    var name = 'Janitor';
    var parent = new Actor({
        spritesheet: 'janitor.png',
        height: 200,
        width: 50
    });

    return {
        name: function () { return name; },
        spritesheet: function () { return spritesheet; }
    };
})();