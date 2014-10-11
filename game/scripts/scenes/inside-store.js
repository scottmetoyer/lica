var InsideStore = (function (options) {
    "use strict"

    var name = 'Inside Store';
    var background = 'inside-store.png';
    var navmesh = { "polygons": [{ "vertices": [{ "x": 309, "y": 603 }, { "x": 619, "y": 642 }, { "x": 529, "y": 715 }, { "x": 62, "y": 716 }], "centroid": { "x": 361.69692192955694, "y": 669.8032814671684 } }, { "vertices": [{ "x": 50, "y": 531 }, { "x": 272, "y": 515 }, { "x": 311, "y": 602 }, { "x": 61, "y": 715 }], "centroid": { "x": 161.54021722411593, "y": 596.2146440213751 } }, { "vertices": [{ "x": 918, "y": 362 }, { "x": 1101, "y": 360 }, { "x": 1121, "y": 715 }, { "x": 528, "y": 718 }], "centroid": { "x": 900.8249540207728, "y": 570.1192550213439 } }], "links": [{ "x": 197, "y": 653 }, { "x": 566, "y": 681 }] };
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

if (Engine != undefined) {
    Engine.addScene(InsideStore);
}