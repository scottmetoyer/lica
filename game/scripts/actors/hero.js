var Hero = (function (parameters) {
    "use strict"

    var name = 'Hero';
    var parent = new Actor({
        spritesheet: 'hero.png',
        height: 64,
        width: 64
    });

    return {
        name: function () { return name; },
        position: parent.position,
        update: parent.update,
        draw: parent.draw
    };
})();

if (Engine) {
    Engine.hero(Hero);
    Engine.addObject(Hero);
}