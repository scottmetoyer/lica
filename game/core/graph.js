var Vertex = function () {
    var element;
    var visited;
    var edges;
    var next;

    return {
        element: function (value) {
            if (value != undefined) { element = value; }
            return element;
        },
        visited: function (value) {
            if (value != undefined) { visited = value; }
            return visited;
        },
        edges: function (value) {
            if (value != undefined) { edges = value; }
            return edges;
        },
        next: function (value) {
            if (value != undefined) { next = value; }
            return next;
        },
    }
};

var Edge = function () {
    var connectsTo;
    var nextEdge;

    return {
        connects: function (value) {
            if (value != undefined) {
                connectsTo = value;
            }
            return connectsTo;
        },

        next: function (value) {
            if (value != undefined) {
                nextEdge = value;
            }
            return nextEdge;
        }
    }
};

var Graph = function () {
    var verticeList = null;
    var head = null;
    var tail = null;

    function addVertex(element) {
        var node = new Vertex();
        node.element(element);

        if (tail == null) {
            head = node;
            tail = node;
        } else {
            tail.next(node);
            tail = node;
        }
    }

    function addEdge(start, end) {
        var edges = new Edge();
        edge.connects(end);

        var edges = start.edges();

        if (edges == null) {
            edges = edge;
        } else {
            // Walk the list until we find the end
            while (edges.next() != null) {
                edges = edges.next();
            }

            // Add this edge to the end of the list
            edges.next(edge);
        }
    }

    function isReachable(graph, source, destination) {
        var isReachable = false;
        var start = null;
        var vertex = graph.vertices();

        while (vertex != null) {
            vertex.visited(false);
            if (vertex.element() == source) {
                start = vertex;
            }
        }

        if (start == null) {
            return false;
        }
            
        return checkReachable(start, destination);
    }

    function checkReachable(start, destination) {
        if (start.visited == true) {
            return false;
        }

        if (start.element() == destination) {
            return true;
        }

        start.visited(true);

        // Recursively check the edges
        var edge = start.edges();

        while (edge != null) {
            if (checkReachable(edge.connects(), destination)) {
                return true;
            }
            edge = edge.next();
        }

        return false;
    }

    function toString() {
        var node = head;

        while (node != null) {
            console.log(node.element());
            node = node.next();
        }
    }

    return {
        addVertex: addVertex,
        addEdge: addEdge,
        isReachable: isReachable,
        toString: toString,
        headNode: function(value) {
            if (value != undefined) {
                head = value;
            }
        },
        tailNode: function(value) {
            if (value != undefined) {
                tail = value;
            }
        },
        vertices: function (value) {
            if (value != undefined) {
                verticeList = value;
            }
            return verticeList;
        }
    }
};