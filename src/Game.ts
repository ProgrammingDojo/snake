import { canvas } from "./Canvas.js";
import { Block, Category } from "./Block.js";
import { Snake } from "./Snake.js";

const canvasWidth = canvas.canvasWidth;
const canvasHeight = canvas.canvasHeight;
const blockSample = new Block(Category.OBSTACLE, { x: 0, y: 0 });
const blockLength = blockSample.sideLength;
const maxBlockNumber =
    (canvasWidth / blockLength) * (canvasHeight / blockLength);

export class Game {
    public level: number;
    private levelObstacleNumber: number;
    private levelFoodsNumber: number;
    private obstacles: Block[] = [];
    private foods: Block[] = [];

    constructor(private snake: Snake) {
        this.level = 1;
        this.levelObstacleNumber =
            Math.floor(maxBlockNumber * 0.01) * this.level;
        this.levelFoodsNumber = Math.floor(maxBlockNumber * 0.01) * this.level;
        this.createFoods();
        this.createObstacle();
        this.snake = snake;
        snake.registerDirectionHandler();
    }
    /**
     *
     * @param x send the canvas width or height into this utility function
     * @returns a x or y axis value that is on grid
     */
    private getValidAxisNumber(maxLength: number): number {
        //TODO: Logic bug, should not allow the repeat usage of a same point
        const validAxisNumberList = [];
        const maxBlockNumber = Math.floor(maxLength / blockLength);
        for (let i = 0; i < maxBlockNumber; i++) {
            validAxisNumberList.push(i * blockLength);
        }
        const randomNumber = Math.floor(Math.random() * (maxBlockNumber + 1));
        return validAxisNumberList[randomNumber];
    }

    private createObstacle() {
        for (let i = 0; i < this.levelObstacleNumber; i++) {
            this.obstacles.push(
                new Block(Category.OBSTACLE, {
                    x: this.getValidAxisNumber(canvasWidth),
                    y: this.getValidAxisNumber(canvasHeight),
                })
            );
        }
    }

    /**
     * @effects this.foods create foods on the canvas
     */
    private createFoods():void {
        for (let i = 0; i < this.levelFoodsNumber; i++) {
            this.foods.push(
                new Block(Category.FOOD, {
                    x: this.getValidAxisNumber(canvasWidth),
                    y: this.getValidAxisNumber(canvasHeight),
                })
            );
        }
    }

    private drawObstaclesAndFoods() {
        for (const obstacle of this.obstacles) {
            obstacle.drawBlockOnCanvas();
        }
        for (const health of this.foods) {
            health.drawBlockOnCanvas();
        }
    }

    public isLevelUp(): boolean {
        if (this.snake.score >= this.levelFoodsNumber) {
            return true;
        }
        return false;
    }

    public isGameover(): boolean {
        if (this.snake.healthPoint <= 0) {
            return true;
        }
        return false;
    }

    public setGameStatus(): [number, number] {
        return [this.snake.healthPoint, this.snake.score];
    }

    public init() {
        this.drawObstaclesAndFoods();
        this.snake.init();
        this.snake.checkObstacleOrHealth(this.obstacles, this.foods);
        this.snake.checkSnakeBody();
    }
}
