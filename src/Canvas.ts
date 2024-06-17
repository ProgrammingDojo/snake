class Canvas {
  public canvasContext: CanvasRenderingContext2D;
  constructor(public canvasWidth = 500, public canvasHeight = 500) {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    this.canvasContext = canvas.getContext("2d");
  }
}

export const canvas = new Canvas();
