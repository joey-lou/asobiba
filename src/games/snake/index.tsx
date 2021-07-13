import "./index.css";
import React, { useEffect, useRef, useState } from "react";
import {
  update as updateSnake,
  draw as drawSnake,
  initialize as initializeSnake,
  SNAKE_SPEED,
} from "./snake";
import { initialize as initializeInput } from "./input";
import {
  update as updateFood,
  draw as drawFood,
  initialize as initializeFood,
} from "./food";
import { changeDirection } from "./input";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles(() => ({
  message: {
    display: "fixed",
  },
  paper: {
    backgroundColor: "#60992D",
  },
  start: {
    position: "absolute",
    width: "92vmin",
    textAlign: "center",
    color: "white",
    marginTop: "10vmin",
  },
  over: {
    position: "absolute",
    width: "92vmin",
    textAlign: "center",
    marginTop: "40vmin",
    color: "red",
  },
}));

function Snake() {
  const classes = useStyles();
  const [start, setStart] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const onGameOver = () => {
    setStart(false);
    setIsOver(true);
  };

  useEffect(() => {
    if (start) {
      setIsOver(false);
      initialize();
      const id = setInterval(function () {
        draw();
        update(onGameOver);
      }, 1000 / SNAKE_SPEED);
      // @ts-ignore
      window.addEventListener("keydown", changeDirection);

      return () => {
        clearInterval(id);
        // @ts-ignore
        window.removeEventListener("keydown", changeDirection);
      };
    }
  }, [start]);

  useEffect(() => {
    if (!start) {
      // @ts-ignore
      window.addEventListener("keydown", onPressSpaceBar);

      return () => {
        // @ts-ignore
        window.removeEventListener("keydown", onPressSpaceBar);
      };
    }
  }, [start]);

  const onPressSpaceBar = (ev: React.KeyboardEvent<any>) => {
    if (ev.code === "Space") setStart(true);
  };

  return (
    <Paper className={classes.paper}>
      <div id="game-board">
        {!start && <h3 className={classes.start}>Press Space to Start</h3>}
        {isOver && <h2 className={classes.over}>Game Over</h2>}
      </div>
    </Paper>
  );
}

function initialize() {
  initializeSnake();
  initializeFood();
  initializeInput();
}

function update(onGameOver: Function) {
  updateSnake(onGameOver);
  updateFood();
}

function draw() {
  const gameBoard = document.getElementById("game-board");
  if (gameBoard) {
    // reset gameboard
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
  } else {
    console.warn("uninitialized gameboard!");
  }
}

export default Snake;
