import React from "react";
import * as R from "ramda";

import * as MaterialUi from "@material-ui/core";
import Game from "./Game.jsx";

export default function GameLayout() {
  const [score, setScore] = React.useState(null);
  const [gameMode, setGameMode] = React.useState("");

  return (
    <>
      <MaterialUi.Box padding={2}>
        {R.isEmpty(gameMode) ? (
          <MaterialUi.Box textAlign="center">
            <MaterialUi.Typography>
              Please Select a Game Mode to Start a New Game!
            </MaterialUi.Typography>
            <br />
            <MaterialUi.Button
              color="primary"
              variant="outlined"
              onClick={() => setGameMode("easy")}
              style={{ margin: "6px" }}
            >
              Easy
            </MaterialUi.Button>
            <MaterialUi.Button
              color="primary"
              variant="outlined"
              onClick={() => setGameMode("medium")}
              style={{ margin: "6px" }}
            >
              Medium
            </MaterialUi.Button>
            <MaterialUi.Button
              color="primary"
              variant="outlined"
              onClick={() => setGameMode("hard")}
              style={{ margin: "6px" }}
            >
              Hard
            </MaterialUi.Button>
          </MaterialUi.Box>
        ) : (
          <Game score={score} setScore={setScore} gameMode={gameMode} />
        )}
      </MaterialUi.Box>
    </>
  );
}
