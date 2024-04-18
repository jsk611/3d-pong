import "../lib/babylon.js";
import HavokPhysics from "../lib/HavokPhysics_es.js";
import { createWalls } from "./wall.js";

const originCanvas = document.createElement("canvas");
const engine = new BABYLON.Engine(originCanvas, true);
const canvas1 = document.getElementById("render-canvas-1");
const canvas2 = document.getElementById("render-canvas-2");

const createScene = async function () {
  const scene = new BABYLON.Scene(engine);
  const havokInstance = await HavokPhysics();
  const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
  scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), havokPlugin);

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
  ball.position.y = 2;
  const ballAggregate = new BABYLON.PhysicsAggregate(
    ball,
    BABYLON.PhysicsShapeType.SPHERE,
    {
      mass: 1,
    },
    scene
  );
  ballAggregate.body.setLinearVelocity(new BABYLON.Vector3(1, 1, 1));

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

  createWalls(scene);

  havokPlugin.onTriggerCollisionObservable.add((e) => {
    isTriggerEntered(e, "Ball", "wall1")
      .then(([ball, wall]) => {
        const ballVelocity = ballAggregate.body.getLinearVelocity().clone();
        ballVelocity.x = -1;
        ball.physicsBody.setLinearVelocity(ballVelocity);
      })
      .catch(() => {});
    isTriggerEntered(e, "Ball", "wall2")
      .then(([ball, wall]) => {
        const ballVelocity = ballAggregate.body.getLinearVelocity().clone();
        ballVelocity.x = 1;
        ball.physicsBody.setLinearVelocity(ballVelocity);
      })
      .catch(() => {});
    isTriggerEntered(e, "Ball", "ground")
      .then(([ball, wall]) => {
        const ballVelocity = ballAggregate.body.getLinearVelocity().clone();
        ballVelocity.y = 1;
        ball.physicsBody.setLinearVelocity(ballVelocity);
      })
      .catch(() => {});
    isTriggerEntered(e, "Ball", "ceiling")
      .then(([ball, wall]) => {
        const ballVelocity = ballAggregate.body.getLinearVelocity().clone();
        ballVelocity.y = -1;
        ball.physicsBody.setLinearVelocity(ballVelocity);
      })
      .catch(() => {});
    isTriggerEntered(e, "Ball", "Racket1")
      .then(([ball, wall]) => {
        const ballVelocity = ballAggregate.body.getLinearVelocity().clone();
        ballVelocity.z = 1;
        ball.physicsBody.setLinearVelocity(ballVelocity);
      })
      .catch(() => {});
    isTriggerEntered(e, "Ball", "Racket2")
      .then(([ball, wall]) => {
        const ballVelocity = ballAggregate.body.getLinearVelocity().clone();
        ballVelocity.z = -1;
        ball.physicsBody.setLinearVelocity(ballVelocity);
      })
      .catch(() => {});
  });

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
  scene.onKeyboardObservable.add((keyboardInfo) => {
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
  });
  engine.registerView(canvas1, camera1);
  engine.registerView(canvas2, camera2);

  scene.detachControl();
  engine.inputElement = canvas1;
  scene.attachControl();

  scene.registerBeforeRender(() => {
    racket1Aggregate.body.disablePreStep = false;
    racket2Aggregate.body.disablePreStep = false;
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
  });

  return scene;
};
const scene = await createScene();

/**
 * @param {BABYLON.IBasePhysicsCollisionEvent} e
 * @param {String} name1
 * @param {String} name2
 */
async function isTriggerEntered(e, name1, name2) {
  const colliderNode = e.collider.transformNode;
  const collidedNode = e.collidedAgainst.transformNode;
  if (e.type === "TRIGGER_ENTERED") {
    if (colliderNode.name === name1 && collidedNode.name === name2) {
      return [colliderNode, collidedNode];
    } else if (colliderNode.name === name2 && collidedNode.name === name1) {
      return [collidedNode, colliderNode];
    }
  }
  throw Error("rejected");
}

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
