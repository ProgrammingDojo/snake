class Canvas {
    public canvasContext: CanvasRenderingContext2D;

    constructor(public canvasWidth = 500, public canvasHeight = 500) {
        const canvas =
            (document.getElementById("canvas") as HTMLCanvasElement) || null;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        this.canvasContext = canvas.getContext("2d")
            ? canvas.getContext("2d")
            : null;
    }
}

export const canvas = new Canvas();
