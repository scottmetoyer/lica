var Pathfinder = (function (options) {
    var closedList = [];
    var openList = [];
    var diameter = 10;

    function navigate() {
    }

    function buildGraph(polygons, links) {
        var nodes = {};

        for (var i = 0; i < polygons.length; i++) {
            var polygon = polygons[i];
            var node = polygon.centroid;
            node.links = [];

            for (var j = 0; i < links.length; j++) {
                var link = links[j];
                if (Polygon.checkIntersect(link, diameter, polygon) == true) {
                    // Link is in this polygon. Check to see if it is already accounted for.
                  
                }
            }
        }
    }

    return {
        navigate: navigate
    };
})();