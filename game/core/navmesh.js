var Navmesh = (function (parameters) {
    // Renders a navmesh JSON string into an object graph 
    function render(json, scale) {
        var mesh = JSON.parse(json);

        for (var i = 0; i < mesh.polygons.length; i++) {
            var centroid = mesh.polygons[i].centroid;
            centroid = new Vector2(centroid.x, centroid.y).scale(scale);
            mesh.polygons[i].centroid = centroid;

            for (var j = 0; j < mesh.polygons[i].vertices.length; j++) {
                var vertex = mesh.polygons[i].vertices[j];
                vertex = new Vector2(vertex.x, vertex.y).scale(scale);
                mesh.polygons[i].vertices[j] = vertex;
            }
        }

        for (var i = 0; i < mesh.links.length; i++) {
            mesh.links[i] = new Vector2(mesh.links[i].x, mesh.links[i].y).scale(scale);
        }

        return mesh;
    }

    return {
        render: render
    }
})();