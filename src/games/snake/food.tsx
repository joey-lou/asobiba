import { Grid } from "./@types";
import { expandSnake, onSnake } from "./snake";
import { getRandomIntInclusive } from "./utils";
let food: Grid;
const EXPANSION_RATE = 1;

export function initialize() {
  console.log("init food");
  food = randomLocation();
}

const randomLocation = () => ({
  x: getRandomIntInclusive(1, 21),
  y: getRandomIntInclusive(1, 21),
});

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    while (onSnake(food)) {
      food = randomLocation();
    }
  }
}

export function draw(gameBoard: HTMLElement) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = `${food.y}`;
  foodElement.style.gridColumnStart = `${food.x}`;
  foodElement.classList.add("food");
  gameBoard?.appendChild(foodElement);
}
