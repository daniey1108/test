import React from "react";
import * as R from "ramda";

import * as MaterialUi from "@material-ui/core";
import Game from "./Game";

export default function GameLayout() {
  const [score, setScore] = React.useState(null);
  return (
    <>
      <MaterialUi.Box padding={2}>
        {R.isNil(score) ? (
          <MaterialUi.Box textAlign="center">
            <MaterialUi.Typography>
              Do you want to start a new game?
            </MaterialUi.Typography>
            <br />
            <MaterialUi.Button
              color="primary"
              variant="contained"
              onClick={() => setScore(0)}
            >
              Start!
            </MaterialUi.Button>
          </MaterialUi.Box>
        ) : (
          <MaterialUi.Typography>
            <Game score={score} setScore={setScore} gameMode="easy" />
          </MaterialUi.Typography>
        )}
      </MaterialUi.Box>
    </>
  );
}
