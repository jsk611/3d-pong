import "../lib/babylon.max.js";

const originCanvas = document.createElement("canvas");
const engine = new BABYLON.Engine(originCanvas, true);
const canvas1 = document.getElementById("render-canvas-1");
const canvas2 = document.getElementById("render-canvas-2");

const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  const camera1 = new BABYLON.UniversalCamera(
    "camera1",
    new BABYLON.Vector3(0, 5, -10),
    scene
  );
  camera1.setTarget(BABYLON.Vector3.Zero());

  const camera2 = new BABYLON.UniversalCamera(
    "camera2",
    new BABYLON.Vector3(0, 5, 10),
    scene
  );
  camera2.setTarget(BABYLON.Vector3.Zero());

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.7;

  const sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );
  sphere.position.y = 1;

  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    scene
  );
  engine.registerView(canvas1, camera1);
  engine.registerView(canvas2, camera2);
  return scene;
};
const scene = createScene();

engine.runRenderLoop(function () {
  if (scene.activeCamera) {
    scene.render();
  }
});

window.addEventListener("resize", function () {
  engine.resize();
});
