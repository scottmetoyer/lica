var Navmesh = (function (parameters) {
    var polygons = null;
    var links = null;
    var scaleValue = 1.0;

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

    function scale(value) {
        if (value != undefined) {
            scaleValue = value;

            for (var i = 0; i < links.length; i++) {
               links[i] = links[i].scale(scaleValue)
            }

            for (var i = 0; i < polygons.length; i++) {
                polygons[i].centroid = polygons[i].centroid.scale(scale);

                for (var j = 0; j < polygons[i].vertices.length; j++) {
                    polygons[i].vertices[j] = polygons[i].vertices[j].scale(scale);
                }
            }
        }
        return scaleValue;
    }

    return {
        scale: scale,
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