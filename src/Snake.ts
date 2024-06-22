import { Axies, Block, Category } from "./Block.js";
import { canvas } from "./Canvas.js";

const initialX = canvas.canvasWidth / 2;
const initialY = canvas.canvasHeight / 2;
const bodyBlockSample = new Block(Category.BODY, { x: 0, y: 0 });
const bodyBlockLength = bodyBlockSample.sideLength;
const initialLength = 3;

enum Direction {
    UP,
    LEFT,
    DOWN,
    RIGHT,
}

export class Snake {
    private direction: Direction;
    private snake: Block[] = [];
    private healthPoint = 3;
    constructor() {
        this.initSnake();
        // Bind the directionHandler method to this instance
        this.directionHandler = this.directionHandler.bind(this);
    }

    private initSnake() {
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

    public registerDirectionHandler(): void {
        window.addEventListener("keydown", this.directionHandler);
    }

    private directionHandler(event: KeyboardEvent): void {
        switch (event.key.toLowerCase()) {
            case "w":
                // prevent the snake directly turn to its opposite side.
                if (this.direction !== Direction.DOWN) {
                    this.direction = Direction.UP;
                }
                break;
            case "a":
                if (this.direction !== Direction.RIGHT) {
                    this.direction = Direction.LEFT;
                }
                break;
            case "s":
                if (this.direction !== Direction.UP) {
                    this.direction = Direction.DOWN;
                }
                break;
            case "d":
                if (this.direction !== Direction.LEFT) {
                    this.direction = Direction.RIGHT;
                }
                break;
            default:
                break;
        }
    }
    /**
     * check the x value to handle the cases when the snake go out of the boundary
     * @param x x
     * @returns
     */
    private resetBoundaryX(x: number): number {
        if (x > canvas.canvasWidth) return 0;
        if (x <= 0) return canvas.canvasWidth;
        return x;
    }

    private resetBoundaryY(y: number): number {
        if (y > canvas.canvasHeight) return 0;
        if (y <= 0) return canvas.canvasHeight;
        return y;
    }

    /**
     * the snake has a head and tail,
     * for each frame, the snake's head will move to the next place
     * and the snake's tail will be removed
     * @param direction the direction snake move
     */
    private moveSnakeHead(direction: Direction): void {
        const currentSnakeHead = this.snake[0];

        switch (direction) {
            case Direction.UP:
                this.snake.unshift(
                    new Block(Category.BODY, {
                        x: currentSnakeHead.axies.x,
                        y: this.resetBoundaryY(
                            currentSnakeHead.axies.y - bodyBlockLength
                        ),
                    })
                );
                break;
            case Direction.LEFT:
                this.snake.unshift(
                    new Block(Category.BODY, {
                        x: this.resetBoundaryX(
                            currentSnakeHead.axies.x - bodyBlockLength
                        ),
                        y: currentSnakeHead.axies.y,
                    })
                );
                break;
            case Direction.DOWN:
                this.snake.unshift(
                    new Block(Category.BODY, {
                        x: currentSnakeHead.axies.x,
                        y: this.resetBoundaryY(
                            currentSnakeHead.axies.y + bodyBlockLength
                        ),
                    })
                );
                break;
            case Direction.RIGHT:
                this.snake.unshift(
                    new Block(Category.BODY, {
                        x: this.resetBoundaryX(
                            currentSnakeHead.axies.x + bodyBlockLength
                        ),
                        y: currentSnakeHead.axies.y,
                    })
                );
                break;
            default:
                break;
        }
    }

    private deleteSnakeTail() {
        this.snake.pop();
    }

    private drawSnake() {
        this.snake.forEach((block) => {
            block.drawBlockOnCanvas();
        });
    }

    private shallowEqual(object1: Axies, object2: Axies) {
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

    public hitObstacleOrHealth(obstacles: Block[], healths: Block[]): void {
        const head = this.snake[0];
        const headLocation = head.axies;
        obstacles.forEach((obstacle, index) => {
            if (this.shallowEqual(obstacle.axies, headLocation)) {
                obstacles.splice(index, 1);
                this.healthPoint -= 1;
                this.initSnake();
            }
        });
        healths.forEach((health, index) => {
            if (this.shallowEqual(health.axies, headLocation)) {
                healths.splice(index, 1);
                this.moveSnakeHead(this.direction);
            }
        });
    }

    public init(): void {
        this.moveSnakeHead(this.direction);
        this.deleteSnakeTail();
        this.drawSnake();
    }
}
