import "./index.css";
import React, { useEffect, useState } from "react";
import {
  update as updateSnake,
  draw as drawSnake,
  initialize as initializeSnake,
  SNAKE_SPEED,
} from "./snake";
import Container from "@material-ui/core/Container";
import { initialize as initializeInput } from "./input";
import Typography from "@material-ui/core/Typography";
import {
  update as updateFood,
  draw as drawFood,
  initialize as initializeFood,
} from "./food";
import { changeDirection } from "./input";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles(() => ({
  message: {
    display: "fixed",
  },
  paper: {
    backgroundColor: "grey",
  },
}));

function Snake() {
  const classes = useStyles();
  const [start, setStart] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const onGameOver = () => {
    console.warn("game ended!");
    const gameBoard = document.getElementById("game-board");
    gameBoard!.innerHTML = "";
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
        // @ts-ignore
        window.removeEventListener("keydown", changeDirection);
        clearInterval(id);
      };
    }
  }, [start]);

  const onPressSpaceBar = (ev: React.KeyboardEvent<any>) => {
    if (ev.code === "Space") setStart(true);
  };

  return (
    <Paper className={classes.paper}>
      <div id="game-board" tabIndex={0} onKeyDown={onPressSpaceBar}></div>
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
