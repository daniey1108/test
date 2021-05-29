import React from "react";
import * as R from "ramda";

import * as MaterialUi from "@material-ui/core";
import Game from "./Game.jsx";

export default function GameSetup() {
  const [score, setScore] = React.useState("");
  const [gameMode, setGameMode] = React.useState("");

  const startOver = () => {
    setScore("");
    setGameMode("");
  };

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
          <MaterialUi.Box>
            <MaterialUi.Box
              display="flex"
              alignContent="center"
              justifyContent="center"
              padding={2}
            >
              <MaterialUi.Typography>
                {`You are playing on ${gameMode}! Good Luck!`}
              </MaterialUi.Typography>
            </MaterialUi.Box>
            <MaterialUi.Box
              display="flex"
              alignContent="center"
              justifyContent="space-between"
              padding={2}
            >
              <MaterialUi.Typography>{`Score: ${score}`}</MaterialUi.Typography>
              <MaterialUi.Button
                variant="outlined"
                onClick={startOver}
                size="small"
              >
                Start Over
              </MaterialUi.Button>
            </MaterialUi.Box>
            <Game
              score={score}
              setScore={setScore}
              gameMode={gameMode}
              reset={startOver}
            />
          </MaterialUi.Box>
        )}
      </MaterialUi.Box>
    </>
  );
}
