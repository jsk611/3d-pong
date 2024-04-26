import {
  gameState,
  racket1State,
  racket2State,
  initializeBallState,
} from "./store.js";

/**
 * @param {BABYLON.Scene} scene
 */
export const createRackets = async (scene) => {
  const unlitMaterial = new BABYLON.PBRMaterial("unlit", scene);
  unlitMaterial.emissiveColor = BABYLON.Color3.White();
  unlitMaterial.metallic = 0;
  unlitMaterial.roughness = 0;

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
  racket1.material = unlitMaterial;
  const racket1Aggregate = new BABYLON.PhysicsAggregate(
    racket1,
    BABYLON.PhysicsShapeType.BOX,
    {
      isTriggerShape: true,
      mass: 0,
    },
    scene
  );

  const racketLight1 = new BABYLON.PointLight(
    "racket-light-1",
    BABYLON.Vector3.Zero(),
    scene
  );
  racketLight1.intensity = 0.1;
  racketLight1.parent = racket1;

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
  racket2.material = unlitMaterial;
  const racket2Aggregate = new BABYLON.PhysicsAggregate(
    racket2,
    BABYLON.PhysicsShapeType.BOX,
    {
      isTriggerShape: true,
      mass: 0,
    },
    scene
  );
  racket1Aggregate.body.disablePreStep = false;
  racket2Aggregate.body.disablePreStep = false;
};

/**
 * @param {BABYLON.Scene} scene
 */
export const gameplay = async (scene) => {
  const racket1 = scene.getMeshByName("Racket1");
  const racket2 = scene.getMeshByName("Racket2");
  scene.onKeyboardObservable.add(mapState(scene));
  scene.registerBeforeRender(
    updateRacketPositionBeforeRender(scene, racket1, racket2)
  );
};

/**
 * @param {BABYLON.Scene} scene
 */
function mapState(scene) {
  return (keyboardInfo) => {
    console.log(keyboardInfo);
    switch (keyboardInfo.type) {
      case BABYLON.KeyboardEventTypes.KEYDOWN:
        switch (keyboardInfo.event.key) {
          case "w":
            racket1State.up = true;
            break;
          case "a":
            racket1State.left = true;
            break;
          case "s":
            racket1State.down = true;
            break;
          case "d":
            racket1State.right = true;
            break;
          case "ArrowLeft":
            racket2State.left = true;
            break;
          case "ArrowRight":
            racket2State.right = true;
            break;
          case "ArrowUp":
            racket2State.up = true;
            break;
          case "ArrowDown":
            racket2State.down = true;
            break;
          case " ":
            if (gameState.state === "stop") {
              gameState.state = "start";
              initializeBallState();
              scene
                .getMeshByName("Ball")
                .physicsBody.setLinearVelocity(gameState.ball.direction);
            }
            break;
        }
        break;

      case BABYLON.KeyboardEventTypes.KEYUP:
        switch (keyboardInfo.event.key) {
          case "w":
            racket1State.up = false;
            break;
          case "a":
            racket1State.left = false;
            break;
          case "s":
            racket1State.down = false;
            break;
          case "d":
            racket1State.right = false;
            break;
          case "ArrowLeft":
            racket2State.left = false;
            break;
          case "ArrowRight":
            racket2State.right = false;
            break;
          case "ArrowUp":
            racket2State.up = false;
            break;
          case "ArrowDown":
            racket2State.down = false;
            break;
        }
        break;
    }
  };
}

function updateRacketPositionBeforeRender(scene, racket1, racket2) {
  return () => {
    if (racket1State.up) {
      racket1.position.y = Math.min(
        racket1.position.y + 0.01 * scene.deltaTime,
        9
      );
    }
    if (racket1State.down) {
      racket1.position.y = Math.max(
        racket1.position.y - 0.01 * scene.deltaTime,
        1
      );
    }
    if (racket1State.right) {
      racket1.position.x = Math.min(
        racket1.position.x + 0.01 * scene.deltaTime,
        4
      );
    }
    if (racket1State.left) {
      racket1.position.x = Math.max(
        racket1.position.x - 0.01 * scene.deltaTime,
        -4
      );
    }
    if (racket2State.up) {
      racket2.position.y = Math.min(
        racket2.position.y + 0.01 * scene.deltaTime,
        9
      );
    }
    if (racket2State.down) {
      racket2.position.y = Math.max(
        racket2.position.y - 0.01 * scene.deltaTime,
        1
      );
    }
    if (racket2State.right) {
      racket2.position.x = Math.max(
        racket2.position.x - 0.01 * scene.deltaTime,
        -4
      );
    }
    if (racket2State.left) {
      racket2.position.x = Math.min(
        racket2.position.x + 0.01 * scene.deltaTime,
        4
      );
    }
  };
}
