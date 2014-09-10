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
                    // Link is in this polygon. Add it to the node.
                    node.links.push(link);

                    // Find any existing nodes for this link
                    var linkNode = findExistingNode(nodes, link);

                    // If one is found, link the centroid...
                    if (linkNode) {
                        linkNode.links.push(polygon.centroid);
                    } else {
                        // ...otherwise, just add a new node
                        linkNode = link;
                        nodes.push(linkNode);
                    }
                }
            }

            nodes.push(node);
        }
    }

    function findExistingNode(nodes, nodeToFind) {
        var node = null;

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].x == nodeToFind.x && nodes[i].y == nodeToFind.y) {
                node = nodes[i];
            }
        }
        return node;
    }

    return {
        navigate: navigate
    };
})();