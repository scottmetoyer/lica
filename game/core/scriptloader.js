var Scriptloader = (function () {
    "use strict"

    var loadedScriptIds = [];

    function load(parameters) {
        var guid = guid();
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", parameters.filename);
        script.setAttribute("id", guid);
        script.async = false;
        script.onload = function () {
            loadedScriptIds.push(guid);
            parameters.done(guid);
        };
        script.onerror = function () {
            parameters.error();
        };

        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function unload(guid) {
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length; i >= 0; i--) {
            if (scripts[i] && scripts[i].getAttribute('id') != null && scripts[i].getAttribute('id').indexOf(guid) != -1)
                scripts[i].parentNode.removeChild(scripts[i]);
        }
        var index = loadedScriptIds.indexOf(guid);
        if (index > -1) {
            loadedScriptIds.splice(index, 1);
        }
    }

    function unloadAll() {
        for (var i = 0; i < loadedScriptIds.length; i++) {
            unload(loadedScriptIds[i]);
        }
    }

    function guid() {
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    return {
        load: load,
        unload: unload
    };
})();