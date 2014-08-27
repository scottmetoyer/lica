var Polygon = (function () {
    function checkIntersection(vertices, point, diameter) {
        var intersects = false;

        for (var i = 0, j = vertices.length - 1; i < vertices.length; j = i++)
        {
            if ((((vertices[i].Y <= point.Y + diameter) && (point.Y - diameter< vertices[j].Y)) ||
                    ((vertices[j].Y <= point.Y + diameter) && (point.Y - diameter < vertices[i].Y))) &&
                (point.X - diameter < (vertices[j].X - vertices[i].X) * (point.Y - diameter - vertices[i].Y) / (vertices[j].Y - vertices[i].Y) + vertices[i].X))

                intersects = !intersects;
        }

        return intersects;
    }

    function isConcave(vertices) {
        var positive = 0;
        var negative = 0;
        var length = vertices.length;

        for (var i = 0; i < length; i++) {
            var p0 = vertices[i];
            var p1 = vertices[(i + 1) % length];
            var p2 = vertices[(i + 2) % length];

            // Subtract to get vectors
            var v0 = { X: p0.X - p1.X, Y: p0.Y - p1.Y };
            var v1 = { X: p1.X - p2.X, Y: p1.Y - p2.Y };
            var cross = (v0.X * v1.Y) - (v0.Y * v1.X);

            if (cross < 0) {
                negative++;
            }
            else {
                positive++;
            }
        }

        return (negative != 0 && positive != 0);
    }

    function computeCentroid(vertices, vertexCount) {
        var centroid = { X: 0, Y: 0 };
        var signedArea = 0.0;
        var x0 = 0.0; // Current vertex X
        var y0 = 0.0; // Current vertex Y
        var x1 = 0.0; // Next vertex X
        var y1 = 0.0; // Next vertex Y
        var a = 0.0;  // Partial signed area

        // For all vertices except last
        var i = 0;
        for (i = 0; i < vertexCount - 1; ++i) {
            x0 = vertices[i].X;
            y0 = vertices[i].Y;
            x1 = vertices[i + 1].X;
            y1 = vertices[i + 1].Y;
            a = x0 * y1 - x1 * y0;
            signedArea += a;
            centroid.X += (x0 + x1) * a;
            centroid.Y += (y0 + y1) * a;
        }

        // Do last vertex
        x0 = vertices[i].X;
        y0 = vertices[i].Y;
        x1 = vertices[0].X;
        y1 = vertices[0].Y;
        a = x0 * y1 - x1 * y0;
        signedArea += a;
        centroid.X += (x0 + x1) * a;
        centroid.Y += (y0 + y1) * a;

        signedArea *= 0.5;
        centroid.X /= (6.0 * signedArea);
        centroid.Y /= (6.0 * signedArea);

        return centroid;
    }

    return {
        isConcave: isConcave,
        computeCentroid: computeCentroid,
        checkIntersection: checkIntersection
    };
})();