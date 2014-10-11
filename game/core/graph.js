var Graph = function () {
    this._numOfEdges = 0;
    this._adjacencyLists = {};
};

var Vertex = function (value) {
    this.value = value;
    this.next = null;
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

Graph.prototype.addEdge = function (v, w) {
    this._adjacencyLists[v] = this._adjacencyLists[v] ||
      new AdjacencyList();
    this._adjacencyLists[w] = this._adjacencyLists[w] ||
      new AdjacencyList();
    this._adjacencyLists[v].add(w);
    this._adjacencyLists[w].add(v);
    this._numOfEdges++;
};

Graph.prototype.getVertices = function () {
    return Object.keys(this._adjacencyLists);
};

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