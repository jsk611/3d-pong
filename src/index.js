import "../lib/babylon.js";
import { canvas1, originCanvas } from "./dom.js";
import { createScene } from "./scene.js";

const engine = new BABYLON.Engine(originCanvas, true);

const scene = await createScene();

engine.runRenderLoop(function () {
  if (scene.activeCamera) {
    scene.render();
  }
});

canvas1.focus();
canvas1.addEventListener("blur", () => {
  canvas1.focus();
});

window.addEventListener("resize", function () {
  engine.resize();
});
