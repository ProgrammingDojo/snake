var Canvas = /** @class */ (function () {
    function Canvas(canvasWidth, canvasHeight) {
        if (canvasWidth === void 0) { canvasWidth = 300; }
        if (canvasHeight === void 0) { canvasHeight = 300; }
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        var canvas = document.getElementById("canvas") || null;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        this.canvasContext = canvas.getContext("2d")
            ? canvas.getContext("2d")
            : null;
    }
    return Canvas;
}());
export var canvas = new Canvas();
//# sourceMappingURL=Canvas.js.map