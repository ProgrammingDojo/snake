import { canvas } from "./Canvas.js";
/**
 * OBSTACLE is the block that when snake hits, it will reduce its health point
 * FOOD is the block that when snake hits, it will increase its health point
 * BODY is the building block of the snake body, it will reduce its health point
 */
export var Category;
(function (Category) {
    Category[Category["OBSTACLE"] = 0] = "OBSTACLE";
    Category[Category["FOOD"] = 1] = "FOOD";
    Category[Category["BODY"] = 2] = "BODY";
})(Category || (Category = {}));
/**
 * Block is the basic unit that forms the snake, food and obstacle, it's a square
 */
var Block = /** @class */ (function () {
    function Block(category, axies) {
        this.category = category;
        this.axies = axies;
        this.sideLength = 10;
    }
    Block.prototype.chooseColorByCategory = function (canvasContext) {
        switch (this.category) {
            case Category.OBSTACLE: {
                canvasContext.fillStyle = "red";
                break;
            }
            case Category.FOOD: {
                canvasContext.fillStyle = "green";
                break;
            }
            case Category.BODY: {
                canvasContext.fillStyle = "black";
                break;
            }
        }
    };
    Block.prototype.drawBlockMain = function (canvasContext) {
        canvasContext.fillRect(this.axies.x, this.axies.y, this.sideLength, this.sideLength);
    };
    Block.prototype.drawBlockStroke = function (canvasContext) {
        canvasContext.strokeStyle = "white";
        canvasContext.strokeRect(this.axies.x, this.axies.y, this.sideLength, this.sideLength);
    };
    Block.prototype.drawBlockOnCanvas = function () {
        var canvasContext = canvas.canvasContext;
        this.chooseColorByCategory(canvasContext);
        this.drawBlockMain(canvasContext);
        this.drawBlockStroke(canvasContext);
    };
    return Block;
}());
export { Block };
//# sourceMappingURL=Block.js.map