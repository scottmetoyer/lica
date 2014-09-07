// vector2.js
// Almost trivially simple 2d vector class
// Scott Metoyer, 2014

var Vector2 = function (x, y) {
    this.x = x;
    this.y = y;
}

Vector2.prototype.add = function (v) {
    return new Vector2(this.x + v.x, this.y + v.y);
}

Vector2.prototype.subtract = function (v) {
    return new Vector2(this.x - v.x, this.y - v.y);
}

Vector2.prototype.scale = function (v) {
    return new Vector2(this.x * v, this.y * v);
}

Vector2.prototype.divide = function (v) {
    return new Vector2(this.x / v, this.y / v);
}

Vector2.prototype.length = function () {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
}

Vector2.prototype.normalize = function () {
    var len = 1 / this.length();
    return new Vector2(this.x * len, this.y * len);
}

Vector2.prototype.dot = function (v) {
    return (this.x * v.x) + (this.y * v.y);
}