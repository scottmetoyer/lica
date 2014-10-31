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
        start = start.scale(scale);
        end = end.scale(scale);
        mesh = Navmesh.render(meshJson, scale);
        var inBounds = false;

        // If the click is out of bounds, just return and do nothing
        for (var i = 0; i < mesh.polygons.length; i++) {
            if (Polygon.checkIntersect(end, 10, mesh.polygons[i])) {
                inBounds = true;
            }
        }

        if (!inBounds) { return []; }

        mesh.links.push(start);
        mesh.links.push(end);

        var graph = buildGraph(mesh);

        // Find the shortest path from start to end
        var path = [];

        return path;
    }

    // Create a navigatable graph from a list of links and polygons
    function buildGraph(mesh) {
        var graph = new Graph();
        var nodes = [];

        for (var i = 0; i < mesh.links.length; i++) {
            nodes.push(graph.addVertex(mesh.links[i]));
        }

        var linkDiameter = 10;

        for (var i = 0; i < mesh.polygons.length; i++) {
            for (var j = 0; j < nodes.length; j++) {
                if (Polygon.checkIntersect(nodes[j].element(), linkDiameter, mesh.polygons[i])) {
                    for (var k = 0; k < nodes.length; k++) {
                        if (Polygon.checkIntersect(nodes[k].element(), linkDiameter, mesh.polygons[i]) && k != j) {
                            // TODO: Calculate edge weight
                            graph.addEdge(nodes[j], nodes[k], 0);
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