var Meshmaker = (function () {
    const diameter = 10;
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var polygons = [];
    var links = [];
    var draggingVertex = null;
    var draggingLink = null;
    var currentPolygon = null;
    var image = null;

    function initialize() {
        loop();
    }

    function handleFileSelect(event) {
        var file = event.target.files[0];

        if (!file.type.match('image.*')) {
            document.getElementById('errorMessage').innerText = "Selected file is not a valid image file.";
        }

        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                document.getElementById('fileName').innerText = theFile.name;

                image = new Image();
                image.src = e.target.result;

                image.onload = function () {
                    canvas.height = image.height;
                    canvas.width = image.width;
                    context.drawImage(image, 0, 0);
                    polygons = [];
                    links = [];
                    draggingVertex = null;
                    currentPolygon = null;
                    draggingLink = null;
                }
            };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
        event.preventDefault();
        event.stopPropagation();
    }

    function dropPolygon(position) {
        var size = 30;
        var topLeft = { X: position.X - size, Y: position.Y - size };
        var topRight = { X: position.X + size, Y: position.Y - size };
        var bottomRight = { X: position.X + size, Y: position.Y + size };
        var bottomLeft = { X: position.X - size, Y: position.Y + size };

        var polygon = { vertices: [], centroid: { X: 0, Y: 0 } };
        polygon.vertices.push(topLeft);
        polygon.vertices.push(topRight);
        polygon.vertices.push(bottomRight);
        polygon.vertices.push(bottomLeft);
        polygon.centroid = Polygon.computeCentroid(polygon.vertices, 4);
        polygons.push(polygon);
    }

    function dropLink(position) {
        var link = { X: position.X, Y: position.Y };
        links.push(link);
    }

    function drawCircle(position, radius, color) {
        context.beginPath();
        context.arc(position.X, position.Y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
    }

    function drawPolygon(polygon) {
        var isConvex = false;

        if (polygon.vertices.length > 0) {
            if (Polygon.isConcave(polygon.vertices)) {
                context.fillStyle = 'rgba(255, 0, 0, 0.5)';
            }
            else {
                isConvex = true;
                context.fillStyle = 'rgba(0, 0, 255, 0.5)';
            }
            context.beginPath();
            context.moveTo(polygon.vertices[0].X, polygon.vertices[0].Y);

            // Draw the polygon
            for (var i = 1; i < polygon.vertices.length; i++) {
                context.lineTo(polygon.vertices[i].X, polygon.vertices[i].Y);
            }

            context.closePath();
            context.strokeStyle = 'blue';
            context.stroke();
            context.fill();

            // Draw the grab handles
            for (var i = 0; i < polygon.vertices.length; i++) {
                drawCircle({ X: polygon.vertices[i].X, Y: polygon.vertices[i].Y }, diameter, 'yellow');
            }

            // Draw the centroid
            if (isConvex) {
                drawCircle(polygon.centroid, diameter, 'white');
            }
        }
    }

    function clearCanvas() {
        polygons = [];
        links = [];
    }

    function getCursorPosition(event) {
        var rect = canvas.getBoundingClientRect();
        return {
            X: event.clientX - rect.left,
            Y: event.clientY - rect.top
        };
    }

    function checkHit(position, target) {
        var hit = false;

        if (position.X > target.X - diameter && position.X < target.X + diameter && position.Y > target.Y - diameter && position.Y < target.Y + diameter) {
            hit = true;
        }

        return hit;
    }

    function handleMouseDown(event) {
        var position = getCursorPosition(event);
        var polygonClick = document.getElementById('polygons').checked;
        var linkClick = document.getElementById('links').checked;

        // Check if over a drag handle
        for (var x = 0; x < polygons.length; x++) {
            var polygon = polygons[x];

            for (var y = 0; y < polygon.vertices.length; y++) {
                if (checkHit(position, polygon.vertices[y])) {
                    draggingVertex = polygon.vertices[y];
                    currentPolygon = polygon;
                }
            }
        }

        // Check if over a link
        for (var x = 0; x < links.length; x++) {
            var link = links[x];
            if (checkHit(position, link)) {
                draggingLink = link;
            }
        }

        if (image && !draggingVertex && !draggingLink) {
            var position = getCursorPosition(event);

            if (polygonClick) {
                dropPolygon(position);
            }

            if (linkClick) {
                dropLink(position);
            }
        }
    }

    function handleMouseUp(event) {
        draggingVertex = null;
        currentPolygon = null;
        draggingLink = null;
    }

    function handleMouseMove(event) {
        var position = getCursorPosition(event);

        if (draggingVertex) {
            draggingVertex.X = position.X;
            draggingVertex.Y = position.Y;
            currentPolygon.centroid = Polygon.computeCentroid(currentPolygon.vertices, 4);
        }

        if (draggingLink) {
            draggingLink.X = position.X;
            draggingLink.Y = position.Y;
        }
    }

    function loop() {
        window.requestAnimationFrame(loop);
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        if (image) {
            context.drawImage(image, 0, 0);
        }

        // Draw the polygons and link lines
        for (var i = 0; i < polygons.length; i++) {
            drawPolygon(polygons[i]);
            points = [];

            points.push(polygons[i].centroid);

            for (var j = 0; j < links.length; j++) {
                if (Polygon.checkPointInPolygon(polygons[i].vertices, links[j])) {
                    points.push(links[j]);
                }
            }

            if (points.length > 0) {
                context.beginPath();
                context.moveTo(points[0].X, points[0].Y);

                for (var k = 1; k < points.length; k++) {
                    context.lineTo(points[k].X, points[k].Y);
                }

                context.closePath();
                context.strokeStyle = 'white';
                context.stroke();
            }
        }

        // Draw the link nodes
        for (var i = 0; i < links.length; i++) {
            drawCircle(links[i], diameter, 'white');
        }
    }

    return {
        handleFileSelect: handleFileSelect,
        handleMouseMove: handleMouseMove,
        handleCanvasReset: clearCanvas,
        handleMouseUp: handleMouseUp,
        handleMouseDown: handleMouseDown,
        initialize: initialize
    };
})();

document.getElementById('file').addEventListener('change', Meshmaker.handleFileSelect, false);
document.getElementById('reset').addEventListener('click', Meshmaker.handleCanvasReset, false);
document.getElementById('render').addEventListener('click', Meshmaker.handleMeshRender, false);
document.getElementById('canvas').addEventListener('mousedown', Meshmaker.handleMouseDown, false);
document.getElementById('canvas').addEventListener('mouseup', Meshmaker.handleMouseUp, false);
document.getElementById('canvas').addEventListener('mousemove', Meshmaker.handleMouseMove, false);
window.addEventListener('load', Meshmaker.initialize, false);