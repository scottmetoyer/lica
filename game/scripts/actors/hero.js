var Hero = (function (parameters) {
    "use strict"

    var name = 'Hero';
    var sprite = new Sprite({
        spriteSheet: 'hero.png',
        width: 64,
        height: 64,
        interval: 100,
        numberOfFrames: [9, 9, 9, 9],
        scale: 1.0,
        loop: false
    });

    var parent = new Actor({
        sprite: sprite
    });

    return {
        name: function () { return name; },
        position: parent.position,
        update: parent.update,
        draw: parent.draw,
        scale: parent.scale,
        facePoint: parent.facePoint
    };
})();

if (Engine) {
    Engine.hero(Hero);
    Engine.addObject(Hero);
}