import { getInputDirection } from "./input";
import { Grid } from "./@types";

export const SNAKE_SPEED = 5;

let snakeBody: Array<Grid> = [];

export function initialize() {
  snakeBody = [{ x: 11, y: 11 }];
}

export function update(onGameOver: Function) {
  const direction = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += direction.x;
  snakeBody[0].y += direction.y;
  if (!isSnakeSafe()) onGameOver();
}

export function draw(gameBoard: HTMLElement) {
  snakeBody.forEach((grid) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = `${grid.y}`;
    snakeElement.style.gridColumnStart = `${grid.x}`;
    snakeElement.classList.add("snake");
    gameBoard?.appendChild(snakeElement);
  });
}

export function onSnake(grid: Grid, excludeHead: boolean = false) {
  for (let i = excludeHead ? 1 : 0; i < snakeBody.length; i++) {
    if (snakeBody[i].x === grid.x && snakeBody[i].y === grid.y) return true;
  }
  return false;
}

function isSnakeSafe() {
  const head = snakeBody[0];
  if (
    onSnake(head, true) ||
    head.x < 1 ||
    head.x > 21 ||
    head.y < 1 ||
    head.y > 21
  )
    return false;

  return true;
}

export function expandSnake(length: number) {
  for (let i = 0; i < length; i++)
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
}
