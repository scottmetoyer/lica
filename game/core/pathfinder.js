var Pathfinder = (function (parameters) {
    var closedList = [];
    var openList = [];
    var mesh = parameters.mesh;

    // http://www.policyalmanac.org/games/aStarTutorial.htm
    // Parameters:
    // start: The Vector2 start point
    // end: The Vector2 end point
    function navigate(start, end) {
        openList = [];
        var node = { point: start, parent: null, f: 0,  };
        openList.push(node);
        var loopCount = 0;

        while (openList.length > 0) {
            var polygon = findPolygonByPoint(node);

            // Add points (centroid and links) in this polygon to the open list
            openList.push({ point: polygon.centroid, parent: node, f: node.f + 1 });

            var links = findPointsInPolygon(polygon);

            for (var i = 0; i < links.length; i++) {
                openList.push({ point: links[i], parent: node, f: node.f + 1 });
            }

            // Remove the lowest scored node and put it on the closed list. Set it as the selected node.
        }
    }

    function findPolygonByPoint(point) {
    }

    function findPointsInPolygon(polygon) {

    }

    return {
        navigate: navigate
    };
})();