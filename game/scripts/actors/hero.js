var Hero = (function (parameters) {
    "use strict"

    var name = 'Hero';
    var spritesheet = 'hero.png';
    var parent = new Actor();

    return {
        name: function () { return name; },
        spritesheet: function () { return spritesheet; },
        position: parent.position,
        update: parent.update,
        draw: parent.draw
    };
})();

if (Engine) {
    Engine.hero(Hero);
    Engine.addGameObject(Hero);
}