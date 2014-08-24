var Meshmaker = (function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var polygons = [];
    var draggingPoint = null;
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
                    draggingPoint = null;
                    currentPolygon = null;
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

        var polygon = { vertices: [], centroid: {X:0, Y: 0}};
        polygon.vertices.push(topLeft);
        polygon.vertices.push(topRight);
        polygon.vertices.push(bottomRight);
        polygon.vertices.push(bottomLeft);
        polygon.centroid = Polygon.computeCentroid(polygon.vertices, 4);
        polygons.push(polygon);
    }

    function drawCircle(position, radius, color) {
        context.beginPath();
        context.arc(position.X, position.Y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
    }

    function drawPolygon(polygon) {
        if (polygon.vertices.length > 0) {
            var drawCentroid = false;

            if (Polygon.isConcave(polygon.vertices)) {
                context.fillStyle = 'rgba(255, 0, 0, 0.5)';
            }
            else {
                drawCentroid = true;
                context.fillStyle = 'rgba(0, 0, 255, 0.5)';
            }
            context.beginPath();

            // Set start point
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
                drawCircle({ X: polygon.vertices[i].X, Y: polygon.vertices[i].Y }, 5, 'yellow');
            }

            // Compute and draw the centroid
            if (drawCentroid) {
                drawCircle({ X: polygon.centroid.X, Y: polygon.centroid.Y }, 5, 'white');
            }
        }
    }

    function clearCanvas() {
        polygons = [];
    }

    function getCursorPosition(event) {
        var rect = canvas.getBoundingClientRect();
        return {
            X: event.clientX - rect.left,
            Y: event.clientY - rect.top
        };
    }

    function handleMouseDown(event) {
        var position = getCursorPosition(event);

        // Are we creating areas or linking polygons?
        if (document.getElementById('areas').checked) {
            // Check if over a drag handle
            for (var x = 0; x < polygons.length; x++) {
                var polygon = polygons[x];

                for (var y = 0; y < polygon.vertices.length; y++) {
                    if (position.X > polygon.vertices[y].X - 5 && position.X < polygon.vertices[y].X + 5
                        && position.Y > polygon.vertices[y].Y - 5 && position.Y < polygon.vertices[y].Y + 5) {
                        draggingPoint = polygon.vertices[y];
                        currentPolygon = polygon;
                    }
                }
            }

            if (image && !draggingPoint) {
                var position = getCursorPosition(event);
                dropPolygon(position);
            }
        } else {

        }
    }

    function handleMouseUp(event) {
        draggingPoint = null;
        currentPolygon = null;
    }

    function handleMouseMove(event) {
        if (draggingPoint) {
            var position = getCursorPosition(event);

            // Check bounds
            draggingPoint.X = position.X;
            draggingPoint.Y = position.Y;

            // Recalulate the centroid
            currentPolygon.centroid = Polygon.computeCentroid(currentPolygon.vertices, 4);
        }
    }

    function loop() {
        window.requestAnimationFrame(loop);
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        if (image) {
            context.drawImage(image, 0, 0);
        }

        for (var i = 0; i < polygons.length; i++) {
            drawPolygon(polygons[i]);
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