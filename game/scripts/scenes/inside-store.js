var InsideStore = (function (options) {
    "use strict"

    var name = 'Inside Store';
    var background = 'inside-store.png';
    var navmesh = { "polygons": [{ "vertices": [{ "x": 57, "y": 582 }, { "x": 1129, "y": 680 }, { "x": 1127, "y": 717 }, { "x": 64, "y": 717 }], "centroid": { "x": 493.1701251601996, "y": 669.3189721775329 } }, { "vertices": [{ "x": 138, "y": 504 }, { "x": 286, "y": 510 }, { "x": 310, "y": 606 }, { "x": 57, "y": 581 }], "centroid": { "x": 198.51472214412894, "y": 554.3091181707431 } }, { "vertices": [{ "x": 903, "y": 359 }, { "x": 1095, "y": 353 }, { "x": 1124, "y": 679 }, { "x": 612, "y": 635 }], "centroid": { "x": 926.2603258914986, "y": 530.462915318007 } }], "links": [{ "x": 185, "y": 592 }, { "x": 877, "y": 656 }] };
    var hotspots = {
        "7F0000": function (action) {
            switch (action) {
                case "LOOK":
                    // Hero.walkTo({ X: 130, Y: 92 });
                    // Hero.playAnimation('dance around');
                    // Game.print("Well that is certainly interesting!");

                    return true;
                    break;

                case "TAKE":
                    // Hero.walkTo({ X: 130, Y: 92 });
                    // Hero.takeItem(Bottle);
                    // Game.print("Well that is certainly interesting!");
                    return true;
                    break;
            }
        },
        "7F3300": function (action) {
        },
        "FFD800": function (action) {
        },
        "B6FF00": function (action) {
        }
    };

    return {
        name: function () { return name; },
        background: function () { return background; },
        navmesh: function () { return navmesh; },
        hotspots: function () { return hotspots; }
    };
})();

if (Engine) {
    Engine.currentScene(InsideStore);
}