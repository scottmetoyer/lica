// polygon.js
// Polygon helper functions
// Scott Metoyer, 2014

var Polygon = (function () {
    function checkPointInPolygon(vertices, point) {
        var intersects = false;

        for (var i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
            if ((((vertices[i].y <= point.y) && (point.y < vertices[j].y)) ||
                    ((vertices[j].y <= point.y) && (point.y < vertices[i].y))) &&
                (point.x < (vertices[j].x - vertices[i].x) * (point.y - vertices[i].y) / (vertices[j].y - vertices[i].y) + vertices[i].x))

                intersects = !intersects;
        }

        return intersects;
    }

    // http://doswa.com/2009/07/13/circle-segment-intersectioncollision.html
    function checkLineCollision(point1, point2, circlePosition, circleRadius) {
        var intersects = false;
        var closest = new Vector2(0, 0);
        var seg_v = point2.subtract(point1);
        var pt_v = circlePosition.subtract(point1);
        var seg_v_unit = seg_v.divide(seg_v.length());
        var proj = pt_v.dot(seg_v_unit);

        // Check the line endpoints
        if ((proj <= 0) || proj >= seg_v.length()) {
            intersects = false;
        } else {
            var proj_v = seg_v_unit.scale(proj);
            closest = proj_v.add(point1);

            // Calculate distance from circle center to closet point on the line - less than the radius?
            var distance = circlePosition.subtract(closest);
            if (distance.length() <= circleRadius) {
                intersects = true;
            }
        }

        return intersects;
    }

    function checkIntersect(point, diameter, polygon) {
        var intersects = false;

        // Check the circle center point for collision
        if (Polygon.checkPointInPolygon(polygon.vertices, point)) {
            intersects = true;
        }

        // Check the first three lines of the polygon
        for (var y = 0; y < 3; y++) {
            if (Polygon.checkLineCollision(polygon.vertices[y], polygon.vertices[y + 1], point, diameter) == true) {
                intersects = true;
            }
        }

        // Check the last line of the polygon
        if (Polygon.checkLineCollision(polygon.vertices[3], polygon.vertices[0], point, diameter) == true) {
            intersects = true;
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
            var v0 = p0.subtract(p1);
            var v1 = p1.subtract(p2);
            var cross = (v0.x * v1.y) - (v0.y * v1.x);

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
        var centroid = new Vector2(0, 0);
        var signedArea = 0.0;
        var x0 = 0.0; // Current vertex X
        var y0 = 0.0; // Current vertex Y
        var x1 = 0.0; // Next vertex X
        var y1 = 0.0; // Next vertex Y
        var a = 0.0;  // Partial signed area

        // For all vertices except last
        var i = 0;
        for (i = 0; i < vertexCount - 1; ++i) {
            x0 = vertices[i].x;
            y0 = vertices[i].y;
            x1 = vertices[i + 1].x;
            y1 = vertices[i + 1].y;
            a = x0 * y1 - x1 * y0;
            signedArea += a;
            centroid.x += (x0 + x1) * a;
            centroid.y += (y0 + y1) * a;
        }

        // Do last vertex
        x0 = vertices[i].x;
        y0 = vertices[i].y;
        x1 = vertices[0].x;
        y1 = vertices[0].y;
        a = x0 * y1 - x1 * y0;
        signedArea += a;
        centroid.x += (x0 + x1) * a;
        centroid.y += (y0 + y1) * a;

        signedArea *= 0.5;
        centroid.x /= (6.0 * signedArea);
        centroid.y /= (6.0 * signedArea);

        return centroid;
    }

    return {
        isConcave: isConcave,
        computeCentroid: computeCentroid,
        checkPointInPolygon: checkPointInPolygon,
        checkLineCollision: checkLineCollision,
        checkIntersect: checkIntersect
    };
})();