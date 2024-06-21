import { Block, Category } from "./Block.js";
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
    private direction = Direction.UP;

    constructor(public healthPoint = 3, public snake: Block[] = []) {
        for (let i = 0; i < initialLength; i++) {
            snake.push(
                new Block(Category.BODY, {
                    x: initialX,
                    y: i * bodyBlockLength + initialY,
                })
            );
        }

        // Bind the directionHandler method to this instance
        this.directionHandler = this.directionHandler.bind(this);
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
     * the snake has a head and tail,
     * for each frame, the snake's head will move to the next place 
     * and the snake's tail will be removed
     * @param direction the direction snake move
     */
    private moveSnake(direction: Direction): void {
        const currentSnakeHead = this.snake[0];

        switch (direction) {
            case Direction.UP:
                this.snake.unshift(
                    new Block(Category.BODY, {
                        x: currentSnakeHead.location.x,
                        y: currentSnakeHead.location.y - bodyBlockLength,
                    })
                );
                break;
            case Direction.LEFT:
                this.snake.unshift(
                    new Block(Category.BODY, {
                        x: currentSnakeHead.location.x - bodyBlockLength,
                        y: currentSnakeHead.location.y,
                    })
                );
                break;
            case Direction.DOWN:
                this.snake.unshift(
                    new Block(Category.BODY, {
                        x: currentSnakeHead.location.x,
                        y: currentSnakeHead.location.y + bodyBlockLength,
                    })
                );
                break;
            case Direction.RIGHT:
                this.snake.unshift(
                    new Block(Category.BODY, {
                        x: currentSnakeHead.location.x + bodyBlockLength,
                        y: currentSnakeHead.location.y,
                    })
                );
                break;
            default:
                break;
        }

        this.snake.pop();
    }

    private drawSnake() {
        const canvasContext = canvas.canvasContext;
        canvasContext.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);
        this.snake.forEach((block) => {
            block.drawBlockOnCanvas();
        });
    }

    public init(): void {
        this.moveSnake(this.direction);
        this.drawSnake();
    }
}
