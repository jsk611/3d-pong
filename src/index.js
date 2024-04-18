import "../lib/babylon.max.js";
import { createWalls } from "./wall.js";

const originCanvas = document.createElement("canvas");
const engine = new BABYLON.Engine(originCanvas, true);
const canvas1 = document.getElementById("render-canvas-1");
const canvas2 = document.getElementById("render-canvas-2");

const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  const camera1 = new BABYLON.UniversalCamera(
    "camera1",
    new BABYLON.Vector3(0, 5, -20),
    scene
  );
  camera1.setTarget(new BABYLON.Vector3(0, 5, 0));

  const camera2 = new BABYLON.UniversalCamera(
    "camera2",
    new BABYLON.Vector3(0, 5, 20),
    scene
  );
  camera2.setTarget(new BABYLON.Vector3(0, 5, 0));

  const pointLight = new BABYLON.PointLight(
    "Point Light",
    new BABYLON.Vector3(0, 5, 0),
    scene
  );
  pointLight.intensity = 0.5;

  const ball = BABYLON.MeshBuilder.CreateSphere(
    "Ball",
    { diameter: 1, segments: 32 },
    scene
  );
  const sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );

  const racket1 = new BABYLON.MeshBuilder.CreateBox(
    "Racket1",
    {
      width: 2,
      height: 2,
      depth: 0.5,
    },
    scene
  );
  racket1.position = new BABYLON.Vector3(0, 5, -10);
  const racket2 = new BABYLON.MeshBuilder.CreateBox(
    "Racket2",
    {
      width: 2,
      height: 2,
      depth: 0.5,
    },
    scene
  );
  racket2.position = new BABYLON.Vector3(0, 5, 10);

  createWalls(scene);
  engine.registerView(canvas1, camera1);
  engine.registerView(canvas2, camera2);
  return scene;
};
const scene = createScene();

engine.runRenderLoop(function () {
  if (scene.activeCamera) {
    console.log(scene);
    scene.render();
  }
});

window.addEventListener("resize", function () {
  engine.resize();
});
