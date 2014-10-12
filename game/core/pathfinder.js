var Pathfinder = (function (parameters) {
    var closedList = [];
    var openList = [];
    var navmeshJson = parameters.navmeshJson;
    var scale = parameters.scale;

    // Parameters:
    // start: The Vector2 start point
    // end: The Vector2 end point
    function navigate(start, end) {
        var mesh = Navmesh.render(navmeshJson, scale);
        var inBounds = false;

        for (var i = 0; i < mesh.polygons.length; i++) {
            if (Polygon.checkIntersect(end.scale(scale), 10, mesh.polygons[i])) {
                inBounds = true;
            }
        }

        if (!inBounds) {
            return null;
        }

        mesh.links.push(start.scale(scale));
        mesh.links.push(end.scale(scale));

        var graph = buildGraph(mesh);
        graph.toString();
        return graph;
    }

    // Create a navigatable graph from a list of links and polygons
    function buildGraph(mesh) {
        var graph = new Graph();
        var linkDiameter = 10;

        for (var i = 0; i < mesh.polygons.length; i++) {
            for (var j = 0; j < mesh.links.length; j++) {
                if (Polygon.checkIntersect(mesh.links[j], linkDiameter, mesh.polygons[i])) {
                    for (var k = 0; k < mesh.links.length; k++) {
                        if (Polygon.checkIntersect(mesh.links[k], linkDiameter, mesh.polygons[i]) && k != j) {
                            graph.addEdge(j, k)
                        }
                    }
                }
            }
        }

        return graph;
    }

    return {
        navigate: navigate
    };
});