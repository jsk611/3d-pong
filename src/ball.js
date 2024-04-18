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

  const ballAggregate = new BABYLON.PhysicsAggregate(
    ball,
    BABYLON.PhysicsShapeType.SPHERE,
    {
      mass: 1,
    },
    scene
  );
  ballAggregate.body.setLinearVelocity(new BABYLON.Vector3(1, 1, 1));
};

/**
 * @param {BABYLON.Scene} scene
 */
export const registerBallTrigger = async (scene) => {
  const physicsEngine = scene.getPhysicsEngine();
  const havokPlugin = physicsEngine.getPhysicsPlugin();

  havokPlugin.onTriggerCollisionObservable.add((e) => {
    isTriggerEntered(e, "Ball", "wall1")
      .then(([ball, wall]) => {
        const ballVelocity = ball.physicsBody.getLinearVelocity().clone();
        ballVelocity.x = -1;
        ball.physicsBody.setLinearVelocity(ballVelocity);
      })
      .catch(() => {});
    isTriggerEntered(e, "Ball", "wall2")
      .then(([ball, wall]) => {
        const ballVelocity = ball.physicsBody.getLinearVelocity().clone();
        ballVelocity.x = 1;
        ball.physicsBody.setLinearVelocity(ballVelocity);
      })
      .catch(() => {});
    isTriggerEntered(e, "Ball", "ground")
      .then(([ball, wall]) => {
        const ballVelocity = ball.physicsBody.getLinearVelocity().clone();
        ballVelocity.y = 1;
        ball.physicsBody.setLinearVelocity(ballVelocity);
      })
      .catch(() => {});
    isTriggerEntered(e, "Ball", "ceiling")
      .then(([ball, wall]) => {
        const ballVelocity = ball.physicsBody.getLinearVelocity().clone();
        ballVelocity.y = -1;
        ball.physicsBody.setLinearVelocity(ballVelocity);
      })
      .catch(() => {});
    isTriggerEntered(e, "Ball", "Racket1")
      .then(([ball, racket]) => {
        const ballVelocity = ball.physicsBody.getLinearVelocity().clone();
        ballVelocity.z = 1;
        ball.physicsBody.setLinearVelocity(ballVelocity);
      })
      .catch(() => {});
    isTriggerEntered(e, "Ball", "Racket2")
      .then(([ball, racket]) => {
        const ballVelocity = ball.physicsBody.getLinearVelocity().clone();
        ballVelocity.z = -1;
        ball.physicsBody.setLinearVelocity(ballVelocity);
      })
      .catch(() => {});
  });
};
