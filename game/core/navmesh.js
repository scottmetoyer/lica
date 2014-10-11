var Navmesh = (function (parameters) {
    var polygons = null;
    var links = null;

    if (parameters.scale != undefined) {
        scaleValue = parameters.scale;
    }

    if (parameters.obj != undefined) {
        var obj = parameters.obj;

        polygons = obj.polygons.slice();
        links = obj.links.slice();

        for (var i = 0; i < polygons.length; i++) {
            var centroid = polygons[i].centroid;
            centroid = new Vector2(centroid.x, centroid.y);
            polygons[i].centroid = centroid;

            for (var j = 0; j < polygons[i].vertices.length; j++) {
                var vertex = polygons[i].vertices[j];
                vertex = new Vector2(vertex.x, vertex.y);
                polygons[i].vertices[j] = vertex;
            }
        }

        for (var i = 0; i < links.length; i++) {
            links[i] = new Vector2(links[i].x, links[i].y);
        }
    }

    return {
        polygons: function (value) {
            if (value != undefined) {
                polygons = value;
            }
            return polygons;
        },
        links: function (value) {
            if (value != undefined) {
                links = value;
            }
            return links;
        }
    }
});