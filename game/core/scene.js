var Scene = (function () {
    var canvas = document.getElementById('canvas');

    function load(parameters) {
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", parameters.filename);
        script.async = false;
        script.onload = function () {
            parameters.done(this);
        };

        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function unload(filename) {
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length; i >= 0; i--) {
            if (scripts[i] && scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').indexOf(filename) != -1)
                scripts[i].parentNode.removeChild(scripts[i]);
        }
    }

    return {
        load: load,
        unload: unload
    };
})();