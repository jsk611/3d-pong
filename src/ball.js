import { gameState } from "./store.js";
import { isTriggerEntered } from "./utils.js";

/**
 * @param {BABYLON.Scene} scene
 */
export const createBall = async (scene) => {
  const ball = BABYLON.MeshBuilder.CreateSphere(
    "Ball",
    { diameter: 1, segments: 32 },
    scene
  );
  ball.position.y = 2;
  const ballMaterial = new BABYLON.PBRMaterial("neon-ball", scene);
  ballMaterial.emissiveColor = new BABYLON.Color3(
    80 / 255,
    254 / 255,
    252 / 255
  );
  ballMaterial.metallic = 0;
  ball.material = ballMaterial;

  const ballLight = new BABYLON.PointLight(
    "neon-ball-point",
    BABYLON.Vector3.Zero(),
    scene
  );
  ballLight.diffuse = new BABYLON.Color3(80 / 255, 254 / 255, 252 / 255);
  ballLight.parent = ball;
  ballLight.intensity = 1;

  const ballIndicator = new BABYLON.MeshBuilder.CreateCylinder(
    "ball-cylinder",
    { diameter: 0.1 },
    scene
  );
  ballIndicator.position.y = -1;
  ballIndicator.scaling.y = 1;
  ballIndicator.parent = ball;
  ballIndicator.material = new BABYLON.PBRMaterial(
    "neon-ball-indicator",
    scene
  );
  ballIndicator.material.emissiveColor = new BABYLON.Color3(
    80 / 255,
    254 / 255,
    252 / 255
  );
  ballIndicator.material.metallic = 0;
  scene.registerBeforeRender(() => {
    ballIndicator.position.y = -ball.position.y / 2;
    ballIndicator.scaling.y = ball.position.y / 2;
  });

  const ballAggregate = new BABYLON.PhysicsAggregate(
    ball,
    BABYLON.PhysicsShapeType.SPHERE,
    {
      mass: 1,
    },
    scene
  );
};

/**
 * @param {BABYLON.Scene} scene
 */
export const registerBallTrigger = async (scene) => {
  const physicsEngine = scene.getPhysicsEngine();
  const havokPlugin = physicsEngine.getPhysicsPlugin();
  const ball = scene.getMeshByName("Ball");

  function updateBallVelocity() {
    ball.physicsBody.setLinearVelocity(
      gameState.ball.direction.clone().normalize().scale(gameState.ball.speed)
    );
  }

  scene.registerBeforeRender(() => {
    if (gameState.state == "start") {
      gameState.ball.speed += (scene.deltaTime ?? 0) * 0.0001;
      updateBallVelocity();
      if (Math.abs(ball.position.z) >= 15) {
        gameState.state = "stop";
        ball.position = new BABYLON.Vector3(0, 2, 0);
        ball.physicsBody.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
        ball.physicsBody.dispose();
        const ballAggregate = new BABYLON.PhysicsAggregate(
          ball,
          BABYLON.PhysicsShapeType.SPHERE,
          {
            mass: 1,
          },
          scene
        );
      }
    }
  });

  havokPlugin.onTriggerCollisionObservable.add((e) => {
    if (gameState.state == "start") {
      isTriggerEntered(e, "Ball", "wall1")
        .then(([ball, wall]) => {
          const direction = gameState.ball.direction;
          direction.x = -Math.abs(direction.x);
          updateBallVelocity();
        })
        .catch(() => {});
      isTriggerEntered(e, "Ball", "wall2")
        .then(([ball, wall]) => {
          const direction = gameState.ball.direction;
          direction.x = Math.abs(direction.x);
          updateBallVelocity();
        })
        .catch(() => {});
      isTriggerEntered(e, "Ball", "ground")
        .then(([ball, wall]) => {
          const direction = gameState.ball.direction;
          direction.y = Math.abs(direction.y);
          updateBallVelocity();
        })
        .catch(() => {});
      isTriggerEntered(e, "Ball", "ceiling")
        .then(([ball, wall]) => {
          const direction = gameState.ball.direction;
          direction.y = -Math.abs(direction.y);
          updateBallVelocity();
        })
        .catch(() => {});
      isTriggerEntered(e, "Ball", "Racket1")
        .then(([ball, racket]) => {
          gameState.ball.direction = ball.position.subtract(
            racket.position.clone().subtractFromFloats(0, 0, 1.5)
          );
          updateBallVelocity();
        })
        .catch(() => {});
      isTriggerEntered(e, "Ball", "Racket2")
        .then(([ball, racket]) => {
          gameState.ball.direction = ball.position.subtract(
            racket.position.clone().addInPlaceFromFloats(0, 0, 1.5)
          );
          updateBallVelocity();
        })
        .catch(() => {});
    }
  });
};
