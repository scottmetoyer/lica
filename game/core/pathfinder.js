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
        mesh.links.push(start.scale(scale));
        mesh.links.push(end.scale(scale));

        var graph = buildGraph(mesh);

        // TODO: Apply Djikstra's algorithm to this graph to get a path and return it
        // graph.toString();
    }

    // Create a navigatable graph from a list of links and polygons
    function buildGraph(mesh) {
        var graph = new Graph();
        var linkDiameter = 10;

        for (var i = 0; i < mesh.polygons.length; i++) {
            console.log("polygon " + i + ": ");
            for (var j = 0; j < mesh.links.length; j++) {
                if (Polygon.checkIntersect(mesh.links[j], linkDiameter, mesh.polygons[i])) {
                    console.log("vertex " + j + " intersects");
                    /*
                    for (var k = 0; k < mesh.links.length; k++) {
                        if (Polygon.checkIntersect(mesh.links[k], linkDiameter, mesh.polygons[i]) && k != j) {
                            graph.addEdge(j, k)
                        }
                    }*/
                }
            }
        }

        return graph;
    }

    return {
        navigate: navigate
    };
});