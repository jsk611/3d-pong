import { canvas1, canvas2 } from "./dom.js";

/**
 * @param {BABYLON.Scene} scene
 */
export const createCameras = async (scene) => {
  const camera1 = new BABYLON.UniversalCamera(
    "camera1",
    new BABYLON.Vector3(0, 8, -20),
    scene
  );
  camera1.setTarget(new BABYLON.Vector3(0, 5, -10));
  camera1.fov = 0.93;
  camera1.fovMode = BABYLON.Camera.FOVMODE_HORIZONTAL_FIXED;

  const camera2 = new BABYLON.UniversalCamera(
    "camera2",
    new BABYLON.Vector3(0, 8, 20),
    scene
  );
  camera2.setTarget(new BABYLON.Vector3(0, 5, 10));
  camera2.fov = 0.93;
  camera2.fovMode = BABYLON.Camera.FOVMODE_HORIZONTAL_FIXED;

  const engine = scene.getEngine();
  engine.registerView(canvas1, camera1);
  engine.registerView(canvas2, camera2);

  scene.detachControl();
  engine.inputElement = canvas1;
  scene.attachControl();

  scene.onBeforeCameraRenderObservable.add(() => {
    const { width1, height1 } = canvas1.getBoundingClientRect();
    camera1.fovMode =
      width1 > height1
        ? BABYLON.Camera.FOVMODE_HORIZONTAL_FIXED
        : BABYLON.Camera.FOVMODE_VERTICLE_FIXED;
    const { width2, height2 } = canvas2.getBoundingClientRect();
    camera1.fovMode =
      width2 > height2
        ? BABYLON.Camera.FOVMODE_HORIZONTAL_FIXED
        : BABYLON.Camera.FOVMODE_VERTICLE_FIXED;
  });
};
