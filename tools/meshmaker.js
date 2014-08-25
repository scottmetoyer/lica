var Meshmaker = (function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var polygons = [];
    var nodes = [];
    var draggingVertex = null;
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
                    draggingVertex = null;
                    currentPolygon = null;
                    currentLink = null;
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
        polygons.push(polygon);
    }

    function dropNode(position) {
        var node = { X: position.X, Y: position.Y };
        nodes.push(node);
    }

    function drawCircle(position, radius, color) {
        context.beginPath();
        context.arc(position.X, position.Y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
    }

    function drawPolygon(polygon) {
        if (polygon.vertices.length > 0) {
            if (Polygon.isConcave(polygon.vertices)) {
                context.fillStyle = 'rgba(255, 0, 0, 0.5)';
            }
            else {
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
                drawCircle({ X: polygon.vertices[i].X, Y: polygon.vertices[i].Y }, 5, 'yellow');
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

    function checkHit(position, target) {
        var hit = false;

        if (position.X > target.X - 5 && position.X < target.X + 5 && position.Y > target.Y - 5 && position.Y < target.Y + 5) {
            hit = true;
        }

        return hit;
    }

    function handleMouseDown(event) {
        var position = getCursorPosition(event);
        var areaClick = document.getElementById('areas').checked;
        var nodeClick = document.getElementById('nodes').checked;

        // Check if over a drag handle
        if (areaClick) {
            for (var x = 0; x < polygons.length; x++) {
                var polygon = polygons[x];

                for (var y = 0; y < polygon.vertices.length; y++) {
                    if (checkHit(position, polygon.vertices[y])) {
                        draggingVertex = polygon.vertices[y];
                        currentPolygon = polygon;
                    }
                }
            }
        }

        if (image && !draggingVertex) {
            var position = getCursorPosition(event);

            if (areaClick) {
                dropPolygon(position);
            }

            if (nodeClick) {
                dropNode(position);
            }
        }
    }

    function handleMouseUp(event) {
        draggingVertex = null;
        currentPolygon = null;
    }

    function handleMouseMove(event) {
        var position = getCursorPosition(event);

        if (draggingVertex) {
            // Check bounds
            draggingVertex.X = position.X;
            draggingVertex.Y = position.Y;
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

        for (var i = 0; i < nodes.length; i++) {
            drawCircle(nodes[i], 5, 'white');
        }

        // Draw the nodes and links
        if (nodes.length > 0) {
            context.beginPath();
            context.moveTo(nodes[0].X, nodes[0].Y);

            for (var i = 1; i < nodes.length; i++) {
                context.lineTo(nodes[i].X, nodes[i].Y);
            }

            context.strokeStyle = 'white';
            context.stroke();
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