import { canvas } from "./Canvas.js";
import { Block, Category } from "./Block.js";

const canvasWidth = canvas.canvasWidth;
const canvasHeight = canvas.canvasHeight;
const blockSample = new Block(Category.OBSTACLE, { x: 0, y: 0 });
const blockLength = blockSample.sideLength;
const maxBlockNumber =
    (canvasWidth / blockLength) * (canvasHeight / blockLength);
export class Game {
    private levelObstacleNumber =
        Math.floor(maxBlockNumber * 0.01) * this.level;
    private levelHealthNumber = Math.floor(maxBlockNumber * 0.01) * this.level;
    private obstacles: Block[] = [];
    private healths: Block[] = [];
    constructor(public level = 1) {
        this.createHealth();
        this.createObstacle();
    }
    /**
     * 
     * @param x send the canvas width or height into this utility function
     * @returns a x or y axis value that is on grid 
     */
    getValidAxisNumber(x: number): number {
        const validAxisNumberList = [];
        const maxBlockNumber = Math.floor(x / blockLength);
        for (let i = 0; i < maxBlockNumber; i++) {
            validAxisNumberList.push(i * blockLength);
        }
        const randomNumber = Math.floor(Math.random() * (maxBlockNumber + 1));
        return validAxisNumberList[randomNumber];
    }

    createObstacle() {
        for (let i = 0; i < this.levelObstacleNumber; i++) {
            this.obstacles.push(
                new Block(Category.OBSTACLE, {
                    x: this.getValidAxisNumber(canvasWidth),
                    y: this.getValidAxisNumber(canvasHeight),
                })
            );
        }
    }

    createHealth() {
        for (let i = 0; i < this.levelHealthNumber; i++) {
            this.healths.push(
                new Block(Category.FOOD, {
                    x: this.getValidAxisNumber(canvasWidth),
                    y: this.getValidAxisNumber(canvasHeight),
                })
            );
        }
    }

    drawObstaclesAndHealths() {
        for (const obstacle of this.obstacles) {
            obstacle.drawBlockOnCanvas();
        }
        for (const health of this.healths) {
            health.drawBlockOnCanvas();
        }
    }

    public init() {
        this.drawObstaclesAndHealths();
    }
}
