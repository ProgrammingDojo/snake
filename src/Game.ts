import { canvas } from "./Canvas.js";
import { Block, Category, Axies } from "./Block.js";
import { Snake } from "./Snake.js";

const canvasWidth = canvas.canvasWidth;
const canvasHeight = canvas.canvasHeight;
const blockSample = new Block(Category.OBSTACLE, { x: 0, y: 0 });
const blockLength = blockSample.sideLength;
const maxBlockNumber =
    (canvasWidth / blockLength) * (canvasHeight / blockLength);

export class Game {
    private levelObstacleNumber: number;
    private levelFoodsNumber: number;
    private obstacles: Block[] = [];
    private foods: Block[] = [];
    private axisPoints = new Set<Axies>();

    constructor(private snake: Snake, public level: number = 1) {
        //use level to decide how many blocks and foods will be set
        this.levelObstacleNumber =
            Math.floor(maxBlockNumber * 0.01) * this.level;
        this.levelFoodsNumber = Math.floor(maxBlockNumber * 0.01) * this.level;
        this.createAxisPoints();
        this.createFoods();
        this.createObstacle();
        this.snake = snake;
        snake.registerDirectionHandler();
    }

    /**
     * @effects this.axisPoints create a set for all the valid points that can be used as foods or obstacles
     */
    private createAxisPoints(): void {
        const xBlockNumber = Math.floor(canvasWidth / blockLength);
        const yBlockNumber = Math.floor(canvasHeight / blockLength);
        for (let i = 0; i < xBlockNumber; i++) {
            const x = blockLength * i;
            for (let j = 0; j < yBlockNumber; j++) {
                const y = blockLength * j;
                this.axisPoints.add({ x, y });
            }
        }
        // Remove the inital starting points of the snake
        const initSnakeBody = this.snake.snake.map((block) => {
            return block.axies;
        });
        initSnakeBody.forEach((axies) => {
            for (let item of this.axisPoints) {
                if (item.x === axies.x && item.y === axies.y) {
                    this.axisPoints.delete(item);
                    break;
                }
            }
        });
    }

    /**
     * @effects this.axisPoints will remove this selected axis point
     * @param set this.axisPoints will be the input
     * @returns the selected random axis point
     */
    private getRandomAndDeleteAxisPoint<Axies>(set: Set<Axies>): Axies {
        if (set.size === 0) {
            throw new Error("The this.axisPoints set is empty");
        }

        const randomIndex = Math.floor(Math.random() * set.size);
        let result: Axies;
        let index = 0;

        for (let item of set) {
            if (index === randomIndex) {
                result = item;
                set.delete(item);
                break;
            }
            index++;
        }

        return result;
    }

    private createObstacle(): void {
        for (let i = 0; i < this.levelObstacleNumber; i++) {
            const { x, y } = this.getRandomAndDeleteAxisPoint(this.axisPoints);
            this.obstacles.push(
                new Block(Category.OBSTACLE, {
                    x,
                    y,
                })
            );
        }
    }

    private createFoods(): void {
        for (let i = 0; i < this.levelFoodsNumber; i++) {
            const { x, y } = this.getRandomAndDeleteAxisPoint(this.axisPoints);
            this.foods.push(
                new Block(Category.FOOD, {
                    x,
                    y,
                })
            );
        }
    }

    /**
     * @effects draw obstacle and foods on canvas
     */
    private drawObstaclesAndFoods() {
        for (const obstacle of this.obstacles) {
            obstacle.drawBlockOnCanvas();
        }
        for (const food of this.foods) {
            food.drawBlockOnCanvas();
        }
    }

    public isLevelUp(): boolean {
        if (this.foods.length <= 0) {
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
