var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { Block, Category } from "./Block.js";
import { canvas } from "./Canvas.js";
var initialX = canvas.canvasWidth / 2;
var initialY = canvas.canvasHeight / 2;
var bodyBlockSample = new Block(Category.BODY, { x: 0, y: 0 });
var bodyBlockLength = bodyBlockSample.sideLength;
var initialLength = 3;
export var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["LEFT"] = 1] = "LEFT";
    Direction[Direction["DOWN"] = 2] = "DOWN";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction || (Direction = {}));
var Snake = /** @class */ (function () {
    function Snake(healthPoint, score) {
        if (healthPoint === void 0) { healthPoint = 3; }
        if (score === void 0) { score = 0; }
        this.healthPoint = healthPoint;
        this.score = score;
        this.snake = [];
        this.initSnake();
        // Bind the directionHandler method to this instance
        this.directionHandler = this.directionHandler.bind(this);
    }
    /**
     * @effects: initiate this.snake
     * @effects: initiate this.direction
     */
    Snake.prototype.initSnake = function () {
        this.snake = [];
        this.direction = Direction.UP;
        for (var i = 0; i < initialLength; i++) {
            this.snake.push(new Block(Category.BODY, {
                x: initialX,
                y: i * bodyBlockLength + initialY,
            }));
        }
    };
    /**
     * @effects listen for keydown event
     */
    Snake.prototype.registerDirectionHandler = function () {
        window.addEventListener("keydown", this.directionHandler);
    };
    /**
     *
     * @param event press keyboard
     * @effect change this.direction based on keyboard press
     */
    Snake.prototype.directionHandler = function (event) {
        var snakeHeadX = this.snake[0].axies.x;
        var snakeHeadY = this.snake[0].axies.y;
        switch (event.key.toLowerCase()) {
            case "w":
                // prevent the snake directly turn to its opposite side, or go up or down when it's on the edge
                if (this.direction !== Direction.DOWN &&
                    snakeHeadX !== 0 &&
                    snakeHeadX !== canvas.canvasWidth) {
                    this.direction = Direction.UP;
                }
                break;
            case "a":
                if (this.direction !== Direction.RIGHT &&
                    snakeHeadY !== 0 &&
                    snakeHeadY !== canvas.canvasWidth) {
                    this.direction = Direction.LEFT;
                }
                break;
            case "s":
                if (this.direction !== Direction.UP &&
                    snakeHeadX !== 0 &&
                    snakeHeadX !== canvas.canvasWidth) {
                    this.direction = Direction.DOWN;
                }
                break;
            case "d":
                if (this.direction !== Direction.LEFT &&
                    snakeHeadY !== 0 &&
                    snakeHeadY !== canvas.canvasWidth) {
                    this.direction = Direction.RIGHT;
                }
                break;
            default:
                break;
        }
    };
    /**
     * check the x value to handle the cases when the snake go out of the boundary
     * @param x axies x value
     * @returns reset x value
     */
    Snake.prototype.resetBoundaryX = function (x) {
        if (x > canvas.canvasWidth)
            return 0;
        if (x < 0)
            return canvas.canvasWidth;
        return x;
    };
    Snake.prototype.resetBoundaryY = function (y) {
        if (y > canvas.canvasHeight)
            return 0;
        if (y < 0)
            return canvas.canvasHeight;
        return y;
    };
    /**
     * @param direction the direction snake move
     * @effects add a new head based on direction to this.snake
     */
    Snake.prototype.moveSnakeHead = function (direction) {
        var head = this.snake[0];
        switch (direction) {
            case Direction.UP:
                this.snake.unshift(new Block(Category.BODY, {
                    x: head.axies.x,
                    y: this.resetBoundaryY(head.axies.y - bodyBlockLength),
                }));
                break;
            case Direction.LEFT:
                this.snake.unshift(new Block(Category.BODY, {
                    x: this.resetBoundaryX(head.axies.x - bodyBlockLength),
                    y: head.axies.y,
                }));
                break;
            case Direction.DOWN:
                this.snake.unshift(new Block(Category.BODY, {
                    x: head.axies.x,
                    y: this.resetBoundaryY(head.axies.y + bodyBlockLength),
                }));
                break;
            case Direction.RIGHT:
                this.snake.unshift(new Block(Category.BODY, {
                    x: this.resetBoundaryX(head.axies.x + bodyBlockLength),
                    y: head.axies.y,
                }));
                break;
            default:
                break;
        }
    };
    /**
     * @effects remove the this.snake's last element
     */
    Snake.prototype.deleteSnakeTail = function () {
        this.snake.pop();
    };
    Snake.prototype.drawSnake = function () {
        this.snake.forEach(function (block) {
            block.drawBlockOnCanvas();
        });
    };
    Snake.prototype.isEqualAxies = function (object1, object2) {
        var e_1, _a;
        var keys1 = Object.keys(object1);
        var keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        try {
            for (var keys1_1 = __values(keys1), keys1_1_1 = keys1_1.next(); !keys1_1_1.done; keys1_1_1 = keys1_1.next()) {
                var key = keys1_1_1.value;
                if (object1[key] !== object2[key]) {
                    return false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keys1_1_1 && !keys1_1_1.done && (_a = keys1_1.return)) _a.call(keys1_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    };
    /**
     * @param {Block[]} obstacles - as description
     * @param {Block[]} foods - as description
     * @effects obstacles: remove obstacle if hit
     * @effects this.healthPoint: reduce healthPoint if hit
     * @effects foods: reduce food if hit
     * @effects this.snake: it may add a snake head if food is hit
     */
    Snake.prototype.checkObstacleOrHealth = function (obstacles, foods) {
        var _this = this;
        var head = this.snake[0];
        var headLocation = head.axies;
        obstacles.forEach(function (obstacle, index) {
            if (_this.isEqualAxies(obstacle.axies, headLocation)) {
                obstacles.splice(index, 1);
                _this.healthPoint--;
                _this.initSnake();
                return;
            }
        });
        foods.forEach(function (food, index) {
            if (_this.isEqualAxies(food.axies, headLocation)) {
                foods.splice(index, 1);
                _this.moveSnakeHead(_this.direction);
                _this.score++;
                return;
            }
        });
    };
    /**
     * @effects it will initiate the snake if the snake eat its own body, it will not effect this.snake
     */
    Snake.prototype.checkSnakeBody = function () {
        var _this = this;
        var head = this.snake[0];
        var headLocation = head.axies;
        var snakeBody = this.snake.slice(1);
        snakeBody.forEach(function (block) {
            if (_this.isEqualAxies(block.axies, headLocation)) {
                _this.healthPoint -= 1;
                _this.initSnake();
                return;
            }
        });
    };
    /**
     * @effects this.snake will add a new head to its direction and delete its tail, then the snake will be drawn
     */
    Snake.prototype.init = function () {
        this.moveSnakeHead(this.direction);
        this.deleteSnakeTail();
        this.drawSnake();
    };
    return Snake;
}());
export { Snake };
//# sourceMappingURL=Snake.js.map