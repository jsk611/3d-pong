import HavokPhysics from "../lib/HavokPhysics_es.js";
import { createBall, registerBallTrigger } from "./ball.js";
import { createCameras } from "./camera.js";
import { createRackets, gameplay } from "./gameplay.js";
import { createWalls } from "./wall.js";

/**
 * @param {BABYLON.Engine} engine
 */
export const createScene = async (engine) => {
  const scene = new BABYLON.Scene(engine);
  await attachHavokPlugin(scene);

  await createCameras(scene);
  await createLight(scene);
  await createWalls(scene);
  await createBall(scene);
  await createRackets(scene);

  await registerBallTrigger(scene);
  await gameplay(scene);

  return scene;
};

/**
 * @param {BABYLON.Scene} scene
 */
async function attachHavokPlugin(scene) {
  const havokInstance = await HavokPhysics();
  const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
  scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), havokPlugin);
}

/**
 * @param {BABYLON.Scene} scene
 */
async function createLight(scene) {
  const light = new BABYLON.HemisphericLight(
    "Light",
    new BABYLON.Vector3(0, 5, 0),
    scene
  );
  light.intensity = 0.5;
}
