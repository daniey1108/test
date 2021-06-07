import React from "react";
import * as R from "ramda";
import { useSnackbar } from "notistack";

import * as MaterialUi from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Card from "./Card.jsx";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Game({ score, setScore, gameMode, reset }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const mapWithIndex = R.addIndex(R.map);
  const reOrderedCards = cards |> R.sort(() => Math.random() - 0.5);
  const [roundOver, setRoundOver] = React.useState(false);
  const [flippedCard1, setFlippedCard1] = React.useState(null);
  const [flippedCard2, setFlippedCard2] = React.useState(null);
  const [gameCards, setGameCards] = React.useState([]);
  const [solvedCards, setSolvedCards] = React.useState([]);
  const [gameOver, setGameOver] = React.useState(false);

  const handleFlip = (currentCard) => {
    if (flippedCard1 == null && flippedCard2 == null) {
      setFlippedCard1(currentCard);
    }
    if (flippedCard1 != null && flippedCard2 == null) {
      setFlippedCard2(currentCard);
    }
  };

  React.useEffect(() => {
    if (flippedCard1 != null && flippedCard2 != null) {
      setTimeout(() => {
        setRoundOver(true);
      }, 2000);
      if (flippedCard1 === flippedCard2) {
        enqueueSnackbar("You got a match!", { variant: "success" });
        setScore(score |> R.add(1));
        setSolvedCards(solvedCards |> R.append(flippedCard1.id));
      } else {
        enqueueSnackbar("You didn't get a match!", { variant: "warning" });
      }
    }
  }, [flippedCard2]);

  React.useEffect(() => {
    if (gameMode === "easy" && score == 2) {
      setScore("");
      setGameOver(true);
    } else if (gameMode === "medium" && score == 6) {
      setGameOver(true);
      setScore("");
    } else if (gameMode === "hard" && score == 8) {
      setGameOver(true);
      setScore("");
    }
  }, [score]);

  React.useEffect(() => {
    if (roundOver == true) {
      setFlippedCard1(null);
      setFlippedCard2(null);
      setRoundOver(false);
    }
  }, [roundOver]);

  React.useEffect(() => {
    if (gameMode === "easy") {
      setGameCards(
        reOrderedCards
          |> R.dropLast(6)
          |> R.concat((reOrderedCards |> R.dropLast(6)))
          |> R.sort(() => Math.random() - 0.5)
      );
    } else if (gameMode === "medium") {
      setGameCards(
        reOrderedCards
          |> R.dropLast(2)
          |> R.concat((reOrderedCards |> R.dropLast(2)))
          |> R.sort(() => Math.random() - 0.5)
      );
    } else if (gameMode === "hard") {
      setGameCards(
        reOrderedCards
          |> R.concat(reOrderedCards)
          |> R.sort(() => Math.random() - 0.5)
      );
    }
  }, [gameMode]);

  const gameOverCleanUp = () => {
    setGameOver(false);
    reset();
  };

  return (
    <>
      <MaterialUi.Box padding={2} bgcolor="#2286c3">
        <MaterialUi.Grid
          container
          spacing={4}
          justify="space-between"
          alignItems="center"
        >
          {gameCards
            |> mapWithIndex((currentCard, index) => (
              <Card
                currentCard={currentCard}
                handleFlip={() => handleFlip(currentCard)}
                id={index}
                key={index}
                solvedCards={solvedCards}
                roundOver={roundOver}
              />
            ))}
        </MaterialUi.Grid>
      </MaterialUi.Box>
      <MaterialUi.Backdrop
        className={classes.backdrop}
        open={gameOver}
        onClick={() => gameOverCleanUp()}
      >
        <MaterialUi.Typography>{`You did it You won!`}</MaterialUi.Typography>
      </MaterialUi.Backdrop>
    </>
  );
}

const cards = [
  {
    id: "gameCard1",
    altText: "Castiel Cat",
  },
  {
    id: "gameCard2",
    altText: "Crowley with a Hat",
  },
  {
    id: "gameCard3",
    altText: "Crowley and Castiel following Pizza",
  },
  {
    id: "gameCard4",
    altText: "Crowley and Castiel Cuddling",
  },
  {
    id: "gameCard5",
    altText: "Crowley and Castiel cuddling",
  },
  {
    id: "gameCard6",
    altText: "Crowley with Easter Bunny Ears",
  },
  {
    id: "gameCard7",
    altText: "Castiel looking off in space",
  },
  {
    id: "gameCard8",
    altText: "Crowley and Castiel Cuddling",
  },
];
