var Tools = (function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    function handleFileSelect(evt) {
        var file = evt.target.files[0];

        if (!file.type.match('image.*')) {
            document.getElementById('errorMessage').innerText = "Selected file is not a valid image file.";
        }

        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                document.getElementById('fileName').innerText = theFile.name;

                var image = new Image();
                image.src = e.target.result;

                image.onload = function () {
                    var canvas = document.getElementById('canvas');
                    var context = canvas.getContext('2d');

                    canvas.height = image.height;
                    canvas.width = image.width;
                    context.drawImage(image, 0, 0);
                }
            };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
    }

    function handleMeshClick(evt) {
        var x = event.layerX;
        var y = event.layerY;

        drawCircle({ X: x, Y: y }, 4, 'green');
    }

    function drawCircle(position, radius, color) {
        context.beginPath();
        context.arc(position.X, position.Y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
    }

    return {
        handleFileSelect: handleFileSelect,
        handleMeshClick: handleMeshClick
    };
})();

document.getElementById('file').addEventListener('change', Tools.handleFileSelect, false);
document.getElementById('canvas').addEventListener('click', Tools.handleMeshClick, false);
