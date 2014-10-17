var Pathfinder = (function (parameters) {
    var closedList = [];
    var openList = [];
    var meshJson = parameters.navmeshJson;
    var scale = parameters.scale;
    var mesh;

    // Parameters:
    // start: The Vector2 start point
    // end: The Vector2 end point
    function navigate(start, end) {
        mesh = Navmesh.render(meshJson, scale);
        var inBounds = false;

        start = start.scale(scale);
        end = end.scale(scale);

        for (var i = 0; i < mesh.polygons.length; i++) {
            if (Polygon.checkIntersect(end, 10, mesh.polygons[i])) {
                inBounds = true;
            }
        }

        // If the click is out of bounds, just return and do nothing
        if (!inBounds) {
            return [];
        }

        mesh.links.push(start);
        mesh.links.push(end);
        var graph = buildGraph(mesh);

        return path;
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