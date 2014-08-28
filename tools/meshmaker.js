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
        var size = 50;
        var topLeft = new Vector2(position.x - size, position.y - size);
        var topRight = new Vector2(position.x + size, position.y - size);
        var bottomRight = new Vector2(position.x + size, position.y + size);
        var bottomLeft = new Vector2(position.x - size, position.y + size);

        var polygon = { vertices: [], centroid: new Vector2(0, 0) };
        polygon.vertices.push(topLeft);
        polygon.vertices.push(topRight);
        polygon.vertices.push(bottomRight);
        polygon.vertices.push(bottomLeft);

        polygon.centroid = Polygon.computeCentroid(polygon.vertices, 4);
        polygons.push(polygon);
    }

    function dropLink(position) {
        var link = position;
        links.push(link);
    }

    function drawCircle(position, radius, color) {
        context.beginPath();
        context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
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
            context.moveTo(polygon.vertices[0].x, polygon.vertices[0].y);

            // Draw the polygon
            for (var i = 1; i < polygon.vertices.length; i++) {
                context.lineTo(polygon.vertices[i].x, polygon.vertices[i].y);
            }

            context.closePath();
            context.strokeStyle = 'blue';
            context.stroke();
            context.fill();

            // Draw the grab handles
            for (var i = 0; i < polygon.vertices.length; i++) {
                drawCircle(polygon.vertices[i], diameter, 'yellow');
            }

            // Draw the centroid
            if (isConvex) {
                drawCircle(polygon.centroid, diameter, 'lightslategray');
            }
        }
    }

    function clearCanvas() {
        polygons = [];
        links = [];
    }

    function getCursorPosition(event) {
        var rect = canvas.getBoundingClientRect();
        return new Vector2(event.clientX - rect.left, event.clientY - rect.top);
    }

    function checkHit(position, target) {
        var hit = false;

        if (position.x > target.x - diameter && position.x < target.x + diameter && position.y > target.y - diameter && position.y < target.y + diameter) {
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
            draggingVertex.x = position.x;
            draggingVertex.y = position.y;
            currentPolygon.centroid = Polygon.computeCentroid(currentPolygon.vertices, 4);
        }

        if (draggingLink) {
            draggingLink.x = position.x;
            draggingLink.y = position.y;
        }
    }

    function loop() {
        window.requestAnimationFrame(loop);
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        if (image) {
            context.drawImage(image, 0, 0);
        }

        // Draw the polygons
        for (var i = 0; i < polygons.length; i++) {
            drawPolygon(polygons[i]);
        }

        // Draw the link nodes
        for (var i = 0; i < links.length; i++) {
            var intersects = false;

            for (var x = 0; x < polygons.length; x++) {
                var polygon = polygons[x];

                // Check the circle center point for collision
                if (Polygon.checkPointInPolygon(polygon.vertices, links[i])) {
                    intersects = true;
                }

                // Check the first three lines of the polygon
                for (var y = 0; y < 3; y++) {
                    if (Polygon.checkLineCollision(polygon.vertices[y], polygon.vertices[y + 1], links[i], diameter) == true) {
                        intersects = true;
                    }
                }

                // Check the last line of the polygon
                if (Polygon.checkLineCollision(polygon.vertices[3], polygon.vertices[0], links[i], diameter) == true) {
                    intersects = true;
                }
            }

            if (intersects) {
                drawCircle(links[i], diameter, 'white');
            } else {
                drawCircle(links[i], diameter, 'lightgrey');
            }
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