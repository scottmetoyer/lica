var Pathfinder = (function (parameters) {
    var closedList = [];
    var openList = [];
    var mesh = parameters.mesh;

    // Parameters:
    // start: The Vector2 start point
    // end: The Vector2 end point
    function navigate(start, end) {
        var links = mesh.links;
        var polygons = mesh.polygons;

        links.push(start);
        links.push(end);

        var graph = buildGraph(links, polygons);

        // TODO: Apply Djikstra's algorithm to this graph to get a path and return it
        graph.toString();
    }

    // Create a navigatable graph from a list of links and polygons
    function buildGraph(links, polygons) {
        var graph = new Graph();
        var linkDiameter = 10;

        for (var i = 0; i < polygons.length; i++) {
            // Get the nodes that intersect this polygon
            for (var j = 0; j < links.length; j++) {
                if (Polygon.checkIntersect(links[j], linkDiameter, polygons[i])) {
                    for (var k = 0; k < links.length; k++) {
                        if (Polygon.checkIntersect(links[k], linkDiameter, polygons[i]) && k != j) {
                            graph.addEdge(j, k)
                        }
                    }
                }
            }
        }

        return graph;
    }

    function getNodesInPolygon(nodes, polygon) {
        var nodes = [];
        var linkDiameter = 10;

        for (var i = 0; i < nodex.length; i++) {
            if (polygon.checkIntersect(nodes[i], linkDiameter, polygon)) {
                nodes.push(nodes[i]);
            }
        }

        return nodes;
    }

    return {
        navigate: navigate
    };
});