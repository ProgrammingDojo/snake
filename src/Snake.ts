import { Block, Category } from "./Block.js";
import { canvas } from "./Canvas.js";

const canvasCenterX = canvas.canvasWidth / 2;
const canvasCenterY = canvas.canvasHeight / 2;
const bodyBlockSample = new Block(Category.BODY, { x: 0, y: 0 });
const bodyBlockWidth = bodyBlockSample.width;
const initialLength = 3;

export class Snake {
    constructor(public healthPoint = 3, public snake: Block[] = []) {
        for (let i = 0; i < initialLength; i++) {
            snake.push(
                new Block(Category.BODY, {
                    x: canvasCenterX,
                    y: i * bodyBlockWidth + canvasCenterY,
                })
            );
        }
    }

    drawSnake() {
        this.snake.forEach((block) => {
            block.drawBlockOnCanvas();
        });
    }
}
