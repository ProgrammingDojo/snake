var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { Game } from "./Game.js";
import { canvas } from "./Canvas.js";
import { Snake } from "./Snake.js";
var canvasContext = canvas.canvasContext;
var Main = /** @class */ (function () {
    function Main(game) {
        this.game = game;
        this.intervalId = null;
        this.level = 1;
        this.isGameOver = false;
        this.isLevelUp = false;
    }
    Main.prototype.decideGameOver = function (game) {
        if (game.isGameover()) {
            this.isGameOver = true;
            this.stop();
            this.cleanCanvas();
            this.drawGameOver();
            return;
        }
    };
    Main.prototype.decideLevelUp = function (game) {
        if (game.isLevelUp()) {
            this.level++;
            this.isLevelUp = true;
        }
    };
    Main.prototype.drawGameOver = function () {
        canvasContext.font = "bold 28px black serif";
        canvasContext.fillText("GAME OVER", canvas.canvasWidth / 2 - 87, canvas.canvasHeight / 2 + 10);
    };
    Main.prototype.cleanCanvas = function () {
        canvasContext.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);
    };
    Main.prototype.setIntervalTime = function (currentIntervalTime) {
        if (currentIntervalTime === void 0) { currentIntervalTime = 200; }
        return 200 - this.level * 10;
    };
    Main.prototype.main = function () {
        var _this = this;
        this.intervalId = setInterval(function () {
            var _a;
            _this.decideGameOver(_this.game);
            if (_this.isGameOver)
                return;
            _this.decideLevelUp(_this.game);
            if (_this.isLevelUp) {
                var snake = new Snake(_this.healthNumber, _this.scoreNumber);
                _this.game = new Game(snake, _this.level);
                _this.isLevelUp = false;
            }
            _this.cleanCanvas();
            _this.game.init();
            _a = __read(_this.game.setGameStatus(), 2), _this.healthNumber = _a[0], _this.scoreNumber = _a[1];
            _this.setHealthDashboard();
            _this.setScoreDashboard();
            _this.setLevelDashboard();
        }, this.setIntervalTime());
    };
    Main.prototype.stop = function () {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    };
    Main.prototype.setLevelDashboard = function () {
        var health = document.getElementsByClassName("dashboard__level-number")[0] || null;
        health.innerText = String(this.level);
    };
    Main.prototype.setHealthDashboard = function () {
        var health = document.getElementsByClassName("dashboard__health-number")[0] || null;
        health.innerText = String(this.healthNumber);
    };
    Main.prototype.setScoreDashboard = function () {
        var score = document.getElementsByClassName("dashboard__score-number")[0] || null;
        score.innerText = String(this.scoreNumber);
    };
    return Main;
}());
var app = null;
function init() {
    var snake = new Snake();
    var game = new Game(snake, 1);
    if (app) {
        app.stop();
    }
    app = new Main(game);
    app.main();
}
init();
var reset = document.getElementById("reset") || null;
if (reset) {
    reset.addEventListener("click", function () {
        init();
    });
}
//# sourceMappingURL=Main.js.map