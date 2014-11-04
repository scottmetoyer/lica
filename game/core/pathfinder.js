var Pathfinder = (function (parameters) {
    var closedList = [];
    var openList = [];
    var meshJson = parameters.navmeshJson;
    var scale = parameters.scale;
    var mesh;
    var infinity = 999999;

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

        var graph = buildGraph(mesh, start, end);

        // Find the shortest path from start to end
        var path = [];



        return path;
    }

    // Create a navigatable graph from a list of links and polygons
    function buildGraph(mesh, start, end) {
        var graph = new Graph();
        var nodes = [];

        // Add the start and end nodes
        var startNode = graph.addVertex(start);
        startNode.weight = 0;
        nodes.push(startNode);

        var endNode = graph.addVertex(end);
        endNode.weight = infinity;
        nodes.push(endNode);

        // Add the rest of the nodes
        for (var i = 0; i < mesh.links.length; i++) {
            var node = graph.addVertex(mesh.links[i]);
            node.weight = infinity;
            nodes.push(node);
        }

        // Add the weighted edges
        var linkDiameter = 10;

        for (var i = 0; i < mesh.polygons.length; i++) {
            for (var j = 0; j < nodes.length; j++) {
                if (Polygon.checkIntersect(nodes[j].element(), linkDiameter, mesh.polygons[i])) {
                    for (var k = 0; k < nodes.length; k++) {
                        if (Polygon.checkIntersect(nodes[k].element(), linkDiameter, mesh.polygons[i]) && k != j) {
                            // TODO: Calculate edge length
                            graph.addEdge(nodes[j], nodes[k], 0);
                        }
                    }
                }
            }
        }

        return {start: startNode, end: endNode };
    }

    return {
        navigate: navigate
    };
});