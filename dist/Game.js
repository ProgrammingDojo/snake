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
import { canvas } from "./Canvas.js";
import { Block, Category } from "./Block.js";
var canvasWidth = canvas.canvasWidth;
var canvasHeight = canvas.canvasHeight;
var blockSample = new Block(Category.OBSTACLE, { x: 0, y: 0 });
var blockLength = blockSample.sideLength;
var maxBlockNumber = (canvasWidth / blockLength) * (canvasHeight / blockLength);
var Game = /** @class */ (function () {
    function Game(snake, level) {
        if (level === void 0) { level = 1; }
        this.snake = snake;
        this.level = level;
        this.obstacles = [];
        this.foods = [];
        this.axisPoints = new Set();
        //use level to decide how many blocks and foods will be set
        this.levelObstacleNumber =
            Math.floor(maxBlockNumber * 0.01) * this.level;
        this.levelFoodsNumber = Math.floor(maxBlockNumber * 0.01) * this.level;
        this.createAxisPoints();
        this.createFoods();
        this.createObstacle();
        this.snake = snake;
        snake.registerDirectionHandler();
    }
    /**
     * @effects this.axisPoints create a set for all the valid points that can be used as foods or obstacles
     */
    Game.prototype.createAxisPoints = function () {
        var _this = this;
        var xBlockNumber = Math.floor(canvasWidth / blockLength);
        var yBlockNumber = Math.floor(canvasHeight / blockLength);
        for (var i = 0; i < xBlockNumber; i++) {
            var x = blockLength * i;
            for (var j = 0; j < yBlockNumber; j++) {
                var y = blockLength * j;
                this.axisPoints.add({ x: x, y: y });
            }
        }
        // Remove the inital starting points of the snake
        var initSnakeBody = this.snake.snake.map(function (block) {
            return block.axies;
        });
        initSnakeBody.forEach(function (axies) {
            var e_1, _a;
            try {
                for (var _b = __values(_this.axisPoints), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (item.x === axies.x && item.y === axies.y) {
                        _this.axisPoints.delete(item);
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    };
    /**
     * @effects this.axisPoints will remove this selected axis point
     * @param set this.axisPoints will be the input
     * @returns the selected random axis point
     */
    Game.prototype.getRandomAndDeleteAxisPoint = function (set) {
        var e_2, _a;
        if (set.size === 0) {
            throw new Error("The this.axisPoints set is empty");
        }
        var randomIndex = Math.floor(Math.random() * set.size);
        var result;
        var index = 0;
        try {
            for (var set_1 = __values(set), set_1_1 = set_1.next(); !set_1_1.done; set_1_1 = set_1.next()) {
                var item = set_1_1.value;
                if (index === randomIndex) {
                    result = item;
                    set.delete(item);
                    break;
                }
                index++;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (set_1_1 && !set_1_1.done && (_a = set_1.return)) _a.call(set_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    };
    Game.prototype.createObstacle = function () {
        for (var i = 0; i < this.levelObstacleNumber; i++) {
            var _a = this.getRandomAndDeleteAxisPoint(this.axisPoints), x = _a.x, y = _a.y;
            this.obstacles.push(new Block(Category.OBSTACLE, {
                x: x,
                y: y,
            }));
        }
    };
    Game.prototype.createFoods = function () {
        for (var i = 0; i < this.levelFoodsNumber; i++) {
            var _a = this.getRandomAndDeleteAxisPoint(this.axisPoints), x = _a.x, y = _a.y;
            this.foods.push(new Block(Category.FOOD, {
                x: x,
                y: y,
            }));
        }
    };
    /**
     * @effects draw obstacle and foods on canvas
     */
    Game.prototype.drawObstaclesAndFoods = function () {
        var e_3, _a, e_4, _b;
        try {
            for (var _c = __values(this.obstacles), _d = _c.next(); !_d.done; _d = _c.next()) {
                var obstacle = _d.value;
                obstacle.drawBlockOnCanvas();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var _e = __values(this.foods), _f = _e.next(); !_f.done; _f = _e.next()) {
                var food = _f.value;
                food.drawBlockOnCanvas();
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    Game.prototype.isLevelUp = function () {
        if (this.foods.length <= 0) {
            return true;
        }
        return false;
    };
    Game.prototype.isGameover = function () {
        if (this.snake.healthPoint <= 0) {
            return true;
        }
        return false;
    };
    Game.prototype.setGameStatus = function () {
        return [this.snake.healthPoint, this.snake.score];
    };
    Game.prototype.init = function () {
        this.drawObstaclesAndFoods();
        this.snake.init();
        this.snake.checkObstacleOrHealth(this.obstacles, this.foods);
        this.snake.checkSnakeBody();
    };
    return Game;
}());
export { Game };
//# sourceMappingURL=Game.js.map