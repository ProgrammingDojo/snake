import { canvas } from "./Canvas.js";

/**
 * OBSTACLE is the block that when snake hits, it will reduce its health point
 * FOOD is the block that when snake hits, it will increase its health point
 * BODY is the building block of the snake body, it will reduce its health point
 */
export enum Category {
    OBSTACLE,
    FOOD,
    BODY,
}
/**
 * x is the block's distance to the left edge
 * y is the block's distance to the top edge
 */
export interface Axies {
    x: number;
    y: number;
}
/**
 * Block is the basic unit that forms the snake, food and obstacle, it's a square
 */
export class Block {
    public readonly sideLength = 10;
    constructor(public category: Category, public axies: Axies) {}

    chooseColorByCategory(canvasContext: CanvasRenderingContext2D): void {
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
    }

    drawBlockMain(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.fillRect(
            this.axies.x,
            this.axies.y,
            this.sideLength,
            this.sideLength
        );
    }

    drawBlockStroke(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.strokeStyle = "white";
        canvasContext.strokeRect(
            this.axies.x,
            this.axies.y,
            this.sideLength,
            this.sideLength
        );
    }

    drawBlockOnCanvas(): void {
        const canvasContext = canvas.canvasContext;
        this.chooseColorByCategory(canvasContext);
        this.drawBlockMain(canvasContext);
        this.drawBlockStroke(canvasContext);
    }
}
