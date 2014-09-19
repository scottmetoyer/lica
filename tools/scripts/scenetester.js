var Scenetester = (function () {
    "use strict"

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var error = document.getElementById('errorMessage');
    var sceneFilename = null;
    var currentSceneScriptId = null;
    var showNavmesh = true;
    var showActors = true;
    var showObjects = true;

    function initialize() {
        loop();
    }

    function handleLoadScene(event) {
        var filename = document.getElementById('sceneFilename').value;

        if (filename) {
            if (currentSceneScriptId) {
                Scriptloader.unload(currentSceneScriptId);
            }

            filename = '../game/scripts/scenes/' + filename;

            try
            {
                Scriptloader.load({
                    filename: filename,
                    done: function (sceneGuid) {
                        // Set the background image
                        var canvas = document.getElementById('canvas');
                        canvas.style.backgroundImage = "url('../game/assets/scenes/" + Engine.currentScene().background() + "')";

                        // Set the canvas width
                        canvas.width = Game.nativeWidth();
                        canvas.height = Game.nativeWidth() / Game.widthToHeight();

                        // Set the scene title
                        var title = document.getElementById('fileName');
                        title.innerText = Engine.currentScene().name();
                        error.innerText = "";

                        currentSceneScriptId = sceneGuid;
                    },
                    error: function () {
                        error.innerText = "Cannot load the requested file";
                    }
                });
            }
            catch (err) {
                error.innerText = err;
            }
        } else {
            error.innerText = 'Please specify a filename';
        }
    }

    function loop() {
        window.requestAnimationFrame(loop);
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        if (Engine.currentScene()) {
            // Draw game elements
            if (showNavmesh == true) {
                // Draw the polygons
                var polygons = Engine.currentScene().navmesh().polygons
                for (var i = 0; i < polygons.length; i++) {
                    drawPolygon(polygons[i]);
                }
            }
        }
    }

    function drawPolygon(polygon) {
        context.fillStyle = 'rgba(0, 0, 255, 0.5)';
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
    }

    return {
        handleLoadScene: handleLoadScene,
        initialize: initialize,
        showActors: function (e) {
            if (e.target.checked) {
                showActors = true;
            } else {
                showActors = false;
            }
        },
        showNavmesh: function (e) {
            if (e.target.checked) {
                showNavmesh = true;
            } else {
                showNavmesh = false;
            }
        },
        showObjects: function (e) {
            if (e.target.checked) {
                showObjects = true;
            } else {
                showObjects = false;
            }
        }
    };
})();

document.getElementById('loadScene').addEventListener('click', Scenetester.handleLoadScene, false);
document.getElementById('navmesh').addEventListener('change', Scenetester.showNavmesh, false);
document.getElementById('actors').addEventListener('change', Scenetester.showActors, false);
document.getElementById('objects').addEventListener('change', Scenetester.showObjects, false);
window.addEventListener('load', Scenetester.initialize, false);