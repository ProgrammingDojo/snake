import { Game } from "./Game.js";
import { canvas } from "./Canvas.js";
import { Snake } from "./Snake.js";

const canvasContext = canvas.canvasContext;

class Main {
    private healthNumber:number;
    private scoreNumber:number;
    private intervalId: NodeJS.Timeout | null = null;
    private isGameOver:boolean;

    constructor(private game: Game) {
        this.healthNumber = 3;
        this.scoreNumber = 0;
        this.isGameOver = false;
    }

    private decideGameOver(game: Game): void {
        if (game.isGameover()) {
            this.isGameOver = true;
            this.stop();
            this.cleanCanvas();
            canvasContext.font = "bold 28px black serif";
            canvasContext.fillText(
                "GAME OVER",
                canvas.canvasWidth / 2 - 87,
                canvas.canvasHeight / 2 + 10
            );
            return;
        }
    }

    private cleanCanvas(): void {
        canvasContext.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);
    }

    public main() {
        this.intervalId = setInterval(() => {
            this.decideGameOver(this.game);
            if(this.isGameOver) return;
            this.cleanCanvas();
            this.game.init();
            [this.healthNumber, this.scoreNumber] = this.game.setGameStatus();
            this.setHealthDashboard();
            this.setScoreDashboard();
        }, 200);
    }

    public stop() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    private setHealthDashboard(): void {
        const health =
            (document.getElementsByClassName(
                "dashboard__health-number"
            )[0] as HTMLElement) || null;
        health.innerText = String(this.healthNumber);
    }

    private setScoreDashboard(): void {
        const score =
            (document.getElementsByClassName(
                "dashboard__score-number"
            )[0] as HTMLElement) || null;
        score.innerText = String(this.scoreNumber);
    }
}

let app: Main | null = null;

function init() {
    const snake = new Snake();
    const game = new Game(snake);
    if (app) {
        app.stop();
    }
    app = new Main(game);
    app.main();
}

init();

const reset = (document.getElementById("reset") as HTMLButtonElement) || null;

if (reset) {
    reset.addEventListener("click", () => {
        init();
    });
}
