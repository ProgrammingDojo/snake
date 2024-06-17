import { canvas } from "./Canvas.js";

class Main {
  public static main() {
    canvas.canvasContext.fillStyle = "red";
    canvas.canvasContext.fillRect(10, 10, 200, 200);
  }
}

Main.main();
