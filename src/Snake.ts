import { Axies, Block, Category } from "./Block.js";
import { canvas } from "./Canvas.js";

const initialX = canvas.canvasWidth / 2;
const initialY = canvas.canvasHeight / 2;
const bodyBlockSample = new Block(Category.BODY, { x: 0, y: 0 });
const bodyBlockLength = bodyBlockSample.sideLength;
const initialLength = 3;

export enum Direction {
    UP,
    LEFT,
    DOWN,
    RIGHT,
}

export class Snake {
    private direction: Direction;
    private snake: Block[] = [];
    constructor(public healthPoint = 3, public score = 0) {
        this.initSnake();
        // Bind the directionHandler method to this instance
        this.directionHandler = this.directionHandler.bind(this);
    }
    /**
     * @effects: initiate this.snake
     * @effects: initiate this.direction
     */
    private initSnake(): void {
        this.snake = [];
        this.direction = Direction.UP;
        for (let i = 0; i < initialLength; i++) {
            this.snake.push(
                new Block(Category.BODY, {
                    x: initialX,
                    y: i * bodyBlockLength + initialY,
                })
            );
        }
    }

    /**
     * @effects listen for keydown event
     */
    public registerDirectionHandler(): void {
        window.addEventListener("keydown", this.directionHandler);
    }
    /**
     *
     * @param event press keyboard
     * @effect change this.direction based on keyboard press
     */
    private directionHandler(event: KeyboardEvent): void {
        const snakeHeadX = this.snake[0].axies.x;
        const snakeHeadY = this.snake[0].axies.y;
        switch (event.key.toLowerCase()) {
            case "w":
                // prevent the snake directly turn to its opposite side, or go up or down when it's on the edge
                if (
                    this.direction !== Direction.DOWN &&
                    snakeHeadX !== 0 &&
                    snakeHeadX !== canvas.canvasWidth
                ) {
                    this.direction = Direction.UP;
                }
                break;
            case "a":
                if (
                    this.direction !== Direction.RIGHT &&
                    snakeHeadY !== 0 &&
                    snakeHeadY !== canvas.canvasWidth
                ) {
                    this.direction = Direction.LEFT;
                }
                break;
            case "s":
                if (
                    this.direction !== Direction.UP &&
                    snakeHeadX !== 0 &&
                    snakeHeadX !== canvas.canvasWidth
                ) {
                    this.direction = Direction.DOWN;
                }
                break;
            case "d":
                if (
                    this.direction !== Direction.LEFT &&
                    snakeHeadY !== 0 &&
                    snakeHeadY !== canvas.canvasWidth
                ) {
                    this.direction = Direction.RIGHT;
                }
                break;
            default:
                break;
        }
    }
    /**
     * check the x value to handle the cases when the snake go out of the boundary
     * @param x axies x value
     * @returns reset x value
     */
    private resetBoundaryX(x: number): number {
        if (x > canvas.canvasWidth) return 0;
        if (x < 0) return canvas.canvasWidth;
        return x;
    }

    private resetBoundaryY(y: number): number {
        if (y > canvas.canvasHeight) return 0;
        if (y < 0) return canvas.canvasHeight;
        return y;
    }

    /**
     * @param direction the direction snake move
     * @effects add a new head based on direction to this.snake
     */
    private moveSnakeHead(direction: Direction): void {
        const head = this.snake[0];

        switch (direction) {
            case Direction.UP:
                this.snake.unshift(
                    new Block(Category.BODY, {
                        x: head.axies.x,
                        y: this.resetBoundaryY(head.axies.y - bodyBlockLength),
                    })
                );
                break;
            case Direction.LEFT:
                this.snake.unshift(
                    new Block(Category.BODY, {
                        x: this.resetBoundaryX(head.axies.x - bodyBlockLength),
                        y: head.axies.y,
                    })
                );
                break;
            case Direction.DOWN:
                this.snake.unshift(
                    new Block(Category.BODY, {
                        x: head.axies.x,
                        y: this.resetBoundaryY(head.axies.y + bodyBlockLength),
                    })
                );
                break;
            case Direction.RIGHT:
                this.snake.unshift(
                    new Block(Category.BODY, {
                        x: this.resetBoundaryX(head.axies.x + bodyBlockLength),
                        y: head.axies.y,
                    })
                );
                break;
            default:
                break;
        }
    }

    /**
     * @effects remove the this.snake's last element
     */
    private deleteSnakeTail(): void {
        this.snake.pop();
    }

    private drawSnake(): void {
        this.snake.forEach((block) => {
            block.drawBlockOnCanvas();
        });
    }

    private isEqualAxies(object1: Axies, object2: Axies): boolean {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (let key of keys1) {
            if (object1[key] !== object2[key]) {
                return false;
            }
        }

        return true;
    }

    /**
     * @param {Block[]} obstacles - as description
     * @param {Block[]} foods - as description
     * @effects obstacles: remove obstacle if hit
     * @effects this.healthPoint: reduce healthPoint if hit
     * @effects foods: reduce food if hit
     * @effects this.snake: it may add a snake head if food is hit
     */
    public checkObstacleOrHealth(obstacles: Block[], foods: Block[]): void {
        const head = this.snake[0];
        const headLocation = head.axies;
        obstacles.forEach((obstacle, index) => {
            if (this.isEqualAxies(obstacle.axies, headLocation)) {
                //TODO: maybe a fragile part, iterate while modify same array
                obstacles.splice(index, 1);
                this.healthPoint--;
                this.initSnake();
                return;
            }
        });
        foods.forEach((food, index) => {
            if (this.isEqualAxies(food.axies, headLocation)) {
                foods.splice(index, 1);
                this.moveSnakeHead(this.direction);
                this.score++;
                return;
            }
        });
    }
    /**
     * @effects it will initiate the snake if the snake eat its own body, it will not effect this.snake
     */
    public checkSnakeBody(): void {
        const head = this.snake[0];
        const headLocation = head.axies;
        const snakeBody = this.snake.slice(1);
        snakeBody.forEach((block) => {
            if (this.isEqualAxies(block.axies, headLocation)) {
                this.healthPoint -= 1;
                this.initSnake();
                return;
            }
        });
    }

    /**
     * @effects this.snake will add a new head to its direction and delete its tail, then the snake will be drawn
     */
    public init(): void {
        this.moveSnakeHead(this.direction);
        this.deleteSnakeTail();
        this.drawSnake();
    }
}
