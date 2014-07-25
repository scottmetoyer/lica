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

    function isConcave(polygon) {
        var positive = 0;
        var negative = 0;
        var length = polygon.length;

        for (var i = 0; i < length; i++) {
            var p0 = polygon[i];
            var p1 = polygon[(i + 1) % length];
            var p2 = polygon[(i + 2) % length];

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
                    currentPolygon = null;
                    draggingPoint = null;
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

        var polygon = [];
        polygon.push(topLeft);
        polygon.push(topRight);
        polygon.push(bottomRight);
        polygon.push(bottomLeft);

        polygons.push(polygon);
    }

    function drawCircle(position, radius, color) {
        context.beginPath();
        context.arc(position.X, position.Y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
    }

    function drawShape(shape) {
        if (shape.length > 0) {
            if (isConcave(shape)) {
                context.fillStyle = 'rgba(255, 0, 0, 0.5)';
            }
            else {
                context.fillStyle = 'rgba(0, 0, 255, 0.5)';
            }
            context.beginPath();

            // Set start point
            context.moveTo(shape[0].X, shape[0].Y);

            // Draw the polygon
            for (var i = 1; i < shape.length; i++) {
                context.lineTo(shape[i].X, shape[i].Y);
            }

            context.closePath();
            context.strokeStyle = 'blue';
            context.stroke();
            context.fill();

            // Draw the grab handles
            for (var i = 0; i < shape.length; i++) {
                drawCircle({ X: shape[i].X, Y: shape[i].Y }, 5, 'yellow');
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

        // Check if over a drag handle
        for (var x = 0; x < polygons.length; x++) {
            var polygon = polygons[x];

            for (var y = 0; y < polygon.length; y++) {
                if (position.X > polygon[y].X - 5 && position.X < polygon[y].X + 5
                    && position.Y > polygon[y].Y - 5 && position.Y < polygon[y].Y + 5) {
                    draggingPoint = polygon[y];
                }
            }
        }

        if (image && !draggingPoint) {
            var position = getCursorPosition(event);
            dropPolygon(position);
        }
    }

    function handleMouseUp(event) {
        draggingPoint = null;
    }

    function handleMouseMove(event) {
        if (draggingPoint) {
            var position = getCursorPosition(event);

            // Check bounds
            draggingPoint.X = position.X;
            draggingPoint.Y = position.Y;
        }
    }

    function loop() {
        window.requestAnimationFrame(loop);
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        if (image) {
            context.drawImage(image, 0, 0);
        }

        for (var i = 0; i < polygons.length; i++) {
            drawShape(polygons[i]);
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