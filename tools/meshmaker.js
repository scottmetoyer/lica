var Meshmaker = (function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var polygons = new Array();
    var currentPolygon = null;
    var image = null;

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
                    var canvas = document.getElementById('canvas');
                    var context = canvas.getContext('2d');

                    canvas.height = image.height;
                    canvas.width = image.width;
                    context.drawImage(image, 0, 0);

                    currentPolygon = null;
                    polygons = new Array();
                }
            };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
    }

    function handleMeshClick(event) {
        if (!image) {
            return;
        }

        var point = getCursorPosition(event);

        if (document.getElementById('points').checked) {
            if (!currentPolygon) {
                currentPolygon = new Array();
            }

            // Add the point to the polygon array
            currentPolygon.push(point);

            // Draw the connecting line from the previous point
            if (currentPolygon.length > 1) {
                var firstPoint = currentPolygon[0];
                var previousPoint = currentPolygon[currentPolygon.length - 2];

                // Check if this click closes the polygon
                if (point.X >= firstPoint.X - 4 && point.X <= firstPoint.X + 4 &&
                    point.Y >= firstPoint.Y - 4 && point.Y <= firstPoint.Y + 4) {
                    point.X = firstPoint.X;
                    point.Y = firstPoint.Y;

                    currentPolygon[currentPolygon.length - 1] = point;
                    polygons.push(currentPolygon);
                    drawPolygon(currentPolygon);
                    currentPolygon = null;
                }

                context.beginPath();
                context.moveTo(point.X, point.Y);
                context.lineTo(previousPoint.X, previousPoint.Y);
                context.strokeStyle = 'blue';
                context.stroke();
            }

            // Draw the point
            drawCircle(point, 4, 'blue');
        }
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

    function drawCircle(position, radius, color) {
        context.beginPath();
        context.arc(position.X, position.Y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
    }

    function drawPolygon(polygon)  {
        if (polygon.length > 0) {
            context.fillStyle = 'rgba(0, 0, 255, 0.5)';
            context.beginPath();

            // Set start point
            context.moveTo(polygon[0].X, polygon[0].Y);

            // Draw the polygon
            for (var i = 1; i < polygon.length; i++) {
                context.lineTo(polygon[i].X, polygon[i].Y);
            }

            context.closePath();
            context.strokeStyle = 'blue';
            context.stroke();
            context.fill();
        }
    }

    function getCursorPosition(event) {
        var rect = canvas.getBoundingClientRect();
        return {
            X: event.clientX - rect.left,
            Y: event.clientY - rect.top
        };
    }

    return {
        handleFileSelect: handleFileSelect,
        handleMeshClick: handleMeshClick,
        handleMouseMove: handleMouseMove
    };
})();

document.getElementById('file').addEventListener('change', Meshmaker.handleFileSelect, false);
document.getElementById('canvas').addEventListener('click', Meshmaker.handleMeshClick, false);
document.getElementById('canvas').addEventListener('mousemove', Meshmaker.handleMouseMove, false);