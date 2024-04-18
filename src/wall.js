/**
 * @param {BABYLON.Scene} scene
 */
export const createWalls = (scene) => {
  const wall1 = BABYLON.MeshBuilder.CreateGround(
    "wall1",
    { width: 10, height: 20 },
    scene
  );
  wall1.rotate(
    new BABYLON.Vector3(0, 0, 1),
    BABYLON.Angle.FromDegrees(90).radians()
  );
  wall1.position = new BABYLON.Vector3(5, 5, 0);
  const wall1Aggregate = new BABYLON.PhysicsAggregate(
    wall1,
    BABYLON.PhysicsShapeType.BOX,
    {
      isTriggerShape: true,
      mass: 0,
    },
    scene
  );

  const wall2 = BABYLON.MeshBuilder.CreateGround(
    "wall2",
    { width: 10, height: 20 },
    scene
  );
  wall2.rotate(
    new BABYLON.Vector3(0, 0, 1),
    BABYLON.Angle.FromDegrees(-90).radians()
  );
  wall2.position = new BABYLON.Vector3(-5, 5, 0);
  const wall2Aggregate = new BABYLON.PhysicsAggregate(
    wall2,
    BABYLON.PhysicsShapeType.BOX,
    {
      isTriggerShape: true,
      mass: 0,
    },
    scene
  );

  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 10, height: 20 },
    scene
  );
  const groundAggregate = new BABYLON.PhysicsAggregate(
    ground,
    BABYLON.PhysicsShapeType.BOX,
    {
      isTriggerShape: true,
      mass: 0,
    },
    scene
  );

  const ceiling = BABYLON.MeshBuilder.CreateGround(
    "ceiling",
    { width: 10, height: 20 },
    scene
  );
  ceiling.rotate(
    new BABYLON.Vector3(0, 0, 1),
    BABYLON.Angle.FromDegrees(-180).radians()
  );
  ceiling.position = new BABYLON.Vector3(0, 10, 0);
  const ceilingAggregate = new BABYLON.PhysicsAggregate(
    ceiling,
    BABYLON.PhysicsShapeType.BOX,
    {
      isTriggerShape: true,
      mass: 0,
    },
    scene
  );
};
