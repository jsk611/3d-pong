export const racket1State = {
  left: false,
  right: false,
  up: false,
  down: false,
};
export const racket2State = {
  left: false,
  right: false,
  up: false,
  down: false,
};
export const gameState = {
  state: "stop",
  player1Score: 0,
  player2Score: 0,
  ball: {
    speed: 2,
    direction: BABYLON.Vector3.Random(-1, 1).normalize(),
  },
};
export function initializeBallState() {
  gameState.ball.speed = 2;
  gameState.ball.direction = BABYLON.Vector3.Random(-1, 1).normalize();
}
