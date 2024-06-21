import { Snake } from "./Snake.js";
import { Game } from "./Game.js";
import { canvas } from "./Canvas.js";
class Main {
    public main() {
        const game = new Game();
        const snake = new Snake();
        snake.registerDirectionHandler();
        setInterval(() => {
            canvas.canvasContext.clearRect(
                0,
                0,
                canvas.canvasWidth,
                canvas.canvasHeight
            );
            game.init();
            snake.init();
        }, 200);
    }
}

const app = new Main();
app.main();
