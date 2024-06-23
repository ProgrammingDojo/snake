import { Game } from "./Game.js";
import { canvas } from "./Canvas.js";
class Main {
    public main() {
        const game = new Game();
        setInterval(() => {
            canvas.canvasContext.clearRect(
                0,
                0,
                canvas.canvasWidth,
                canvas.canvasHeight
            );
            game.init();
        }, 200);
    }
}

const app = new Main();
app.main();
