import { Game } from "./Game.js";
import { canvas } from "./Canvas.js";
class Main {
    healthNumber = 0;
    scoreNumber = 0;

    public main() {
        const game = new Game();
        const canvasContext = canvas.canvasContext;

        setInterval(() => {
            if (game.isGameover()) {
                canvasContext.font = "bold 28px black serif";
                canvasContext.fillText(
                    "GAME OVER",
                    canvas.canvasWidth / 2 - 100,
                    canvas.canvasHeight / 2
                );
                return;
            }
            canvasContext.clearRect(
                0,
                0,
                canvas.canvasWidth,
                canvas.canvasHeight
            );
            game.init();
            [this.healthNumber, this.scoreNumber] = game.setGameStatus();
            const health =
                (document.getElementsByClassName(
                    "dashboard__health-number"
                )[0] as HTMLElement) || null;
            health.innerText = String(this.healthNumber);
            const score =
                (document.getElementsByClassName(
                    "dashboard__score-number"
                )[0] as HTMLElement) || null;
            score.innerText = String(this.scoreNumber);
        }, 200);
    }
}

function init() {
    const app = new Main();
    app.main();
}
init();

const reset = (document.getElementById("reset") as HTMLButtonElement) || null;

if (reset) {
    reset.addEventListener("click", () => {
        init();
    });
}
