import React from "react";
import * as R from "ramda";
import { useStopwatch } from "react-timer-hook";

import * as MaterialUi from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";
import ReplayIcon from "@material-ui/icons/Replay";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { makeStyles } from "@material-ui/core/styles";

import Game from "./Game.jsx";

const useStyles = makeStyles((theme) => ({
  gameOverBackdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  gamePauseBackdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    backgroundColor: "#000000",
  },
  gameInfoAndActionsGrid: {
    paddingBottom: "6px",
  },
  gameInfoAndActionsItem: {
    textAlign: "center",
  },
}));

export default function GameSetup() {
  const classes = useStyles();
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  const [score, setScore] = React.useState("");
  const [gameMode, setGameMode] = React.useState("");
  const [moves, setMoves] = React.useState("");
  const [gameOver, setGameOver] = React.useState(false);
  const [pauseGame, setPauseGame] = React.useState(false);

  const startOver = () => {
    setScore("");
    setGameMode("");
    setMoves("");
    reset();
  };

  const gameOverCleanUp = () => {
    setGameOver(false);
    startOver();
  };

  React.useEffect(() => {
    if (moves === 0) {
      start();
    }
  }, [moves]);

  React.useEffect(() => {
    if (gameOver) {
      pause();
    }
  }, [gameOver]);

  React.useEffect(() => {
    if (pauseGame) {
      pause();
    }
  }, [pauseGame]);

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
            <MaterialUi.Grid
              container
              justify="center"
              spacing={2}
              className={classes.gameInfoAndActionsGrid}
            >
              <MaterialUi.Grid item sm={3} xs={6}>
                <MaterialUi.Box
                  display="flex"
                  className={classes.gameInfoAndActionsItem}
                >
                  <WatchLaterIcon />
                  <MaterialUi.Typography>
                    {`${days}:${hours}:${minutes}:${seconds}`}
                  </MaterialUi.Typography>
                </MaterialUi.Box>
              </MaterialUi.Grid>
              <MaterialUi.Grid item sm={3} xs={6}>
                <MaterialUi.Box className={classes.gameInfoAndActionsItem}>
                  <MaterialUi.Typography>{`Moves: ${moves}`}</MaterialUi.Typography>
                </MaterialUi.Box>
              </MaterialUi.Grid>
              <MaterialUi.Grid item sm={3} xs={6}>
                <MaterialUi.Box className={classes.gameInfoAndActionsItem}>
                  <MaterialUi.Button
                    variant="outlined"
                    onClick={() => setPauseGame(true)}
                    size="small"
                  >
                    Pause Game <PauseIcon />
                  </MaterialUi.Button>
                </MaterialUi.Box>
              </MaterialUi.Grid>
              <MaterialUi.Grid item sm={3} xs={6}>
                <MaterialUi.Box className={classes.gameInfoAndActionsItem}>
                  <MaterialUi.Button
                    variant="outlined"
                    onClick={startOver}
                    size="small"
                  >
                    Start Over <ReplayIcon />
                  </MaterialUi.Button>
                </MaterialUi.Box>
              </MaterialUi.Grid>
            </MaterialUi.Grid>
            <Game
              score={score}
              setScore={setScore}
              gameMode={gameMode}
              moves={moves}
              setMoves={setMoves}
              setGameOver={setGameOver}
            />
          </MaterialUi.Box>
        )}
      </MaterialUi.Box>
      <MaterialUi.Backdrop
        className={classes.gameOverBackdrop}
        open={gameOver}
        onClick={() => gameOverCleanUp()}
      >
        <MaterialUi.Typography>{`You did it You won!`}</MaterialUi.Typography>
      </MaterialUi.Backdrop>
      <MaterialUi.Backdrop
        className={classes.gamePauseBackdrop}
        open={pauseGame}
        onClick={() => setPauseGame(false)}
      >
        <MaterialUi.Typography>{`Game is Paused`}</MaterialUi.Typography>
      </MaterialUi.Backdrop>
    </>
  );
}
