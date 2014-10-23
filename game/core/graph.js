var Graph = function () {
    this._numOfEdges = 0;
    this._adjacencyLists = {};
};

var Vertex = function () {
    var element;
    var visited;
    var edges = [];
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
    function addVertex() {

    }

    function addEdge() {

    }

    function isReachable(vertex) {

    }

    return {
        addVertex: addVertex,
        addEdge: addEdge,
        isReachable: isReachable
    }
};

var AdjacencyList = function () {
    this.head = null;
    this.tail = null;
};

AdjacencyList.prototype.add = function (value) {
    var vertex = new Vertex(value);
    if (!this.head && !this.tail) {
        this.head = vertex;
    } else {
        this.tail.next = vertex;
    }
    this.tail = vertex;
};

AdjacencyList.prototype.remove = function () {
    var detached = null;
    if (this.head === this.tail) {
        return null;
    } else {
        detached = this.head;
        this.head = this.head.next;
        detached.next = null;
        return detached;
    }
};

AdjacencyList.prototype.contains = function (value) {
    var found = false;
    currentNode = this.head;

    while (currentNode) {
        if (currentNode.value == value) {
            found = true;
        }
        currentNode = currentNode.next;
    }

    return found;
}

Graph.prototype.addEdge = function (v, w) {
    this._adjacencyLists[v] = this._adjacencyLists[v] ||
      new AdjacencyList();
    this._adjacencyLists[w] = this._adjacencyLists[w] ||
      new AdjacencyList();

    if (!(this._adjacencyLists[v].contains(w)) && !(this._adjacencyLists[w].contains(v))) {
        this._adjacencyLists[v].add(w);
        this._adjacencyLists[w].add(v);
        this._numOfEdges++;
    }
};

Graph.prototype.getVertices = function () {
    return Object.keys(this._adjacencyLists);
};

Graph.prototype.getAdjacencyList = function (id) {
    return this._adjacencyLists[id];
}

Graph.prototype.toString = function () {
    var adjString = '';
    var currentNode = null;
    var vertices = this.getVertices();
    console.log(vertices.length + " vertices, " +
      this._numOfEdges + " edges");
    for (var i = 0; i < vertices.length; i++) {
        adjString = vertices[i] + ":";
        currentNode = this._adjacencyLists[vertices[i]].head;
        while (currentNode) {
            adjString += " " + currentNode.value;
            currentNode = currentNode.next;
        }
        console.log(adjString);
        adjString = '';
    }
};