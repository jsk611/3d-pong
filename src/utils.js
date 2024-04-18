/**
 * @param {BABYLON.IBasePhysicsCollisionEvent} e
 * @param {String} name1
 * @param {String} name2
 */
export async function isTriggerEntered(e, name1, name2) {
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
