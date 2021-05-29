import React from "react";
import * as R from "ramda";

import * as MaterialUi from "@material-ui/core";
import Card from "./Card.jsx";

export default function Game({ score, setScore, gameMode }) {
  const mapWithIndex = R.addIndex(R.map);
  const [gameOver, setGameOver] = React.useState(false);
  const [flippedCard1, setFlippedCard1] = React.useState(null);
  const [flippedCard2, setFlippedCard2] = React.useState(null);
  const [gameCards, setGameCards] = React.useState([]);

  const handleFlip = (currentCard) => {
    var flipLensProp = R.lensProp("flipped");
    R.set(flipLensProp, true, currentCard);
    if (flippedCard1 == null && flippedCard2 == null) {
      setFlippedCard1(currentCard.title);
    }
    if (flippedCard1 != null && flippedCard2 == null) {
      setFlippedCard2(currentCard.title);
      console.log("flipping over the ...", currentCard.title, "card2");
    }
  };

  React.useEffect(() => {
    if (flippedCard1 != null && flippedCard2 != null) {
      setGameOver(true);
      if (flippedCard1 === flippedCard2) {
        console.log("you got a match");
        setScore(score |> R.add(1));
        console.log("score:", score |> R.add(1));
      } else {
        console.log("you did not get a match");
      }
    }
  }, [flippedCard2]);

  React.useEffect(() => {
    if (gameMode === "easy" && score == 2) {
      setScore(0);
      console.log("you have won!");
    } else if (gameMode === "medium" && score == 6) {
      setScore(0);
      console.log("you have won!");
    } else if (gameMode === "hard" && score == 8) {
      setScore(0);
      console.log("you have won!");
    }
  }, [score]);

  React.useEffect(() => {
    if (gameOver == true) {
      setFlippedCard1(null);
      setFlippedCard2(null);
      setGameOver(false);
    }
  }, [gameOver]);

  React.useEffect(() => {
    if (gameMode === "easy") {
      setGameCards(
        cards
          |> R.dropLast(6)
          |> R.concat((cards |> R.dropLast(6)))
          |> R.sort(() => Math.random() - 0.5)
      );
    } else if (gameMode === "medium") {
      setGameCards(
        cards
          |> R.dropLast(2)
          |> R.concat((cards |> R.dropLast(2)))
          |> R.sort(() => Math.random() - 0.5)
      );
    } else if (gameMode === "hard") {
      setGameCards(
        cards |> R.concat(cards) |> R.sort(() => Math.random() - 0.5)
      );
    }
  }, [gameMode]);

  return (
    <>
      <MaterialUi.Box>
        <MaterialUi.Typography>{`${
          gameMode |> R.toUpper
        } MODE!`}</MaterialUi.Typography>
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
                  key={index}
                />
              ))}
          </MaterialUi.Grid>
        </MaterialUi.Box>
      </MaterialUi.Box>
    </>
  );
}

const cards = [
  {
    id: "gameCard1",
    altText: "Castiel Cat",
    title: "blackTile",
    flipped: false,
  },
  {
    id: "gameCard2",
    altText: "Crowley with a Hat",
    title: "whiteTile",
    flipped: false,
  },
  {
    id: "gameCard3",
    altText: "Crowley and Castiel following Pizza",
    title: "redTile",
    flipped: false,
  },
  {
    id: "gameCard4",
    altText: "Crowley and Castiel Cuddling",
    title: "greenTile",
    flipped: false,
  },
  {
    id: "gameCard5",
    altText: "Crowley and Castiel cuddling",
    title: "purpleTile",
    flipped: false,
  },
  {
    id: "gameCard6",
    altText: "Crowley with Easter Bunny Ears",
    title: "orangeTile",
    flipped: false,
  },
  {
    id: "gameCard7",
    altText: "Castiel looking off in space",
    title: "yellowTile",
    flipped: false,
  },
  {
    id: "gameCard8",
    altText: "Crowley and Castiel Cuddling",
    title: "blueTile",
    flipped: false,
  },
];
