var Scriptloader = (function () {
    "use strict"

    var loadedScriptIds = [];

    function getGuid() {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }

    function load(parameters) {
        var guid = getGuid();
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", parameters.filename);
        script.setAttribute("id", guid);
        script.async = false;
        script.onload = function () {
            loadedScriptIds.push(guid);

            if (parameters.done) {
                parameters.done(guid);
            }
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

    return {
        load: load,
        unload: unload
    };
})();