var Game = (function(){
    var nativeWidth = 1280;
    var widthToHeight = 16 / 9;

    return {
        nativeWidth: function () { return nativeWidth; },
        widthToHeight: function () { return widthToHeight; }
    };
})();