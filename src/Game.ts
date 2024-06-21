import { canvas } from "./Canvas.js";
import { Block, Category } from "./Block.js";

const canvasWidth = canvas.canvasWidth;
const canvasHeight = canvas.canvasHeight;
const blockSample = new Block(Category.OBSTACLE, { x: 0, y: 0 });
const blockLength = blockSample.sideLength;
const maxBlockNumber =
    (canvasWidth / blockLength) * (canvasHeight / blockLength);
export class Game {
    private levelObstacleNumber = Math.floor(maxBlockNumber * 0.01) * this.level;
    private levelHealthNumber = Math.floor(maxBlockNumber * 0.01) * this.level;
    private obstacles: Block[] = [];
    private healths: Block[] = [];
    constructor(public level = 1) {
        this.createHealth();
        this.createObstacle();
    }

    getRandomNumber(x: number): number {
        return Math.floor(Math.random() * (x + 1));
    }

    createObstacle() {
        for (let i = 0; i < this.levelObstacleNumber; i++) {
            this.obstacles.push(
                new Block(Category.OBSTACLE, {
                    x: this.getRandomNumber(canvasWidth),
                    y: this.getRandomNumber(canvasHeight),
                })
            );
        }
    }

    createHealth() {
        for (let i = 0; i < this.levelHealthNumber; i++) {
            this.healths.push(
                new Block(Category.FOOD, {
                    x: this.getRandomNumber(canvasWidth),
                    y: this.getRandomNumber(canvasHeight),
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
