import { canvas1, canvas2 } from "./dom.js";

/**
 * @param {BABYLON.Scene} scene
 */
export const createCameras = async (scene) => {
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

  const engine = scene.getEngine();
  engine.registerView(canvas1, camera1);
  engine.registerView(canvas2, camera2);

  scene.detachControl();
  engine.inputElement = canvas1;
  scene.attachControl();
};
