/**
 * @param {BABYLON.Scene} scene
 */
export const createRackets = async (scene) => {
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
  const racket1Aggregate = new BABYLON.PhysicsAggregate(
    racket1,
    BABYLON.PhysicsShapeType.BOX,
    {
      isTriggerShape: true,
      mass: 0,
    },
    scene
  );
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
  console.log(racket1);
  scene.onKeyboardObservable.add(mapState);
  scene.registerBeforeRender(
    updateRacketPositionBeforeRender(scene, racket1, racket2)
  );
};

const racket1State = {
  left: false,
  right: false,
  up: false,
  down: false,
};
const racket2State = {
  left: false,
  right: false,
  up: false,
  down: false,
};
function mapState(keyboardInfo) {
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
