var Vertex = function () {
    var element;
    var visited;
    var next;
    var headEdge = null;
    var tailEdge = null;

    return {
        element: function (value) {
            if (value != undefined) { element = value; }
            return element;
        },
        visited: function (value) {
            if (value != undefined) { visited = value; }
            return visited;
        },
        edges: function () {
            return headEdge;
        },
        next: function (value) {
            if (value != undefined) { next = value; }
            return next;
        },
        addEdge: function (edge) {
            if (tailEdge == null) {
                headEdge = edge;
                tailEdge = edge;
            } else {
                tailEdge.next(edge);
                tailEdge = edge;
            }
        }
    }
};

var Edge = function () {
    var connectsTo;
    var nextEdge;
    var weightValue;

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
        },
        weight: function (value) {
            if (value != undefined) {
                weightValue = value;
            }
            return weightValue;
        }
    }
};

var Graph = function () {
    var headNode = null;
    var tailNode = null;

    function addVertex(element) {
        var node = new Vertex();
        node.element(element);

        if (tailNode == null) {
            headNode = node;
            tailNode = node;
        } else {
            tailNode.next(node);
            tailNode = node;
        }

        return node;
    }

    function addEdge(start, end, weight) {
        var edge = new Edge();
        edge.connects(end);
        edge.weight = weight;

        start.addEdge(edge);

        return edge;
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
        var node = headNode;

        while (node != null) {
            console.log(node.element());

            var edge = node.edges();

            while (edge != null) {
                console.log("connects to")
                console.log(edge.connects().element());
                edge = edge.next();
            }
            console.log("");
            node = node.next();
        }
    }

    return {
        addVertex: addVertex,
        addEdge: addEdge,
        isReachable: isReachable,
        toString: toString,
        vertices: function () { return headNode; }
    }
};