var Pathfinder = (function (parameters) {
    var closedList = [];
    var openList = [];
    var mesh = parameters.mesh;

    // Parameters:
    // start: The Vector2 start point
    // end: The Vector2 end point
    function navigate(start, end) {
        var nodes = mesh.links;
        var polygons = mesh.polygons;
        
        nodes.push(start);
        nodes.push(end);

        var graph = buildGraph(nodes, polygons);

        // TODO: Apply Djikstra's algorithm to this graph to get a path and return it
    }

    function buildGraph(nodes, polygons) {
        for (var i = 0; i < polygons.length; i++) {
            // Get the nodes that intersect this polygon

        }
    }

    return {
        navigate: navigate
    };
})();