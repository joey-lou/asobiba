import { KeyboardEvent } from "react";

let direction = { x: 0, y: 0 };
let lastDirection = { x: 0, y: 0 };

export function changeDirection(ev: KeyboardEvent) {
  console.log("listening for event");
  switch (ev.key) {
    case "ArrowUp":
      if (lastDirection.y !== 0) break;
      direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (lastDirection.y !== 0) break;
      direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (lastDirection.x !== 0) break;
      direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (lastDirection.x !== 0) break;
      direction = { x: 1, y: 0 };
      break;
  }
}

export function initialize() {
  direction = { x: 0, y: 0 };
  lastDirection = { x: 0, y: 0 };
}

export function getInputDirection() {
  lastDirection = direction;
  return direction;
}
