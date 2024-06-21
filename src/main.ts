import { Snake } from "./Snake.js";
class Main {
    public main() {
        const snake = new Snake();
        snake.registerDirectionHandler();
        setInterval(() => {
            snake.init();
        }, 200);
    }
}

const app = new Main();
app.main();
