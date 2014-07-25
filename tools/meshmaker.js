var Meshmaker = (function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var polygons = new Array();
    var currentPoint = null;
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
                    polygons = new Array();
                    currentPolygon = null;
                    currentPoint = null;
                }
            };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
        event.preventDefault();
        event.stopPropagation();
    }

    function handleMouseMove(event) {
        if (currentPolygon && currentPolygon.length > 1) {
            var position = getCursorPosition(event);
            var firstPoint = currentPolygon[0];

            if (position.X >= firstPoint.X - 4 && position.X <= firstPoint.X + 4 &&
                position.Y >= firstPoint.Y - 4 && position.Y <= firstPoint.Y + 4) {
                drawCircle(firstPoint, 4, 'yellow');
            } else {
                drawCircle(firstPoint, 4, 'blue');
            }
        }
    }

    function dropPolygon(position) {
        var size = 20;
        var topLeft = { X: position.X - size, Y: position.Y - size };
        var topRight = { X: position.X + size, Y: position.Y - size };
        var bottomRight = { X: position.X + size, Y: position.Y + size };
        var bottomLeft = { X: position.X - size, Y: position.Y + size };

        var polygon = new Array();
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
            context.fillStyle = 'rgba(0, 0, 255, 0.5)';
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
                drawCircle({ X: shape[i].X, Y: shape[i].Y }, 4, 'yellow');
            }
        }
    }

    function clearCanvas() {
        polygons = new Array();
    }

    function getCursorPosition(event) {
        var rect = canvas.getBoundingClientRect();
        return {
            X: event.clientX - rect.left,
            Y: event.clientY - rect.top
        };
    }

    function renderMesh() {
        var cellSize = 5;
        var width = canvas.clientWidth / cellSize;
        var height = canvas.clientHeight / cellSize;
        var grid = [[]];

        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                grid[x][y] = checkCell(x, y, cellSize);
            }
        }
    }

    function handleMouseDown(event) {

    }

    function handleMouseUp(event) {
        if (image) {
            var position = getCursorPosition(event);
            dropPolygon(position);
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
        handleMeshRender: renderMesh,
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