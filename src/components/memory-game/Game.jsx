import React from "react";
import * as R from "ramda";

import * as MaterialUi from "@material-ui/core";
import Card from "./Card.jsx";

export default function Game({ score, setScore, gameMode }) {
  const mapWithIndex = R.addIndex(R.map);
  const [roundOver, setRoundOver] = React.useState(false);
  const [flippedCard1, setFlippedCard1] = React.useState(null);
  const [flippedCard2, setFlippedCard2] = React.useState(null);
  const [gameCards, setGameCards] = React.useState([]);
  const [solvedCards, setSolvedCards] = React.useState([]);

  const handleFlip = (currentCard) => {
    if (flippedCard1 == null && flippedCard2 == null) {
      setFlippedCard1(currentCard);
      console.log("flipping over the ...", currentCard.altText, "card1");
    }
    if (flippedCard1 != null && flippedCard2 == null) {
      setFlippedCard2(currentCard);
      console.log("flipping over the ...", currentCard.altText, "card2");
    }
  };

  React.useEffect(() => {
    if (flippedCard1 != null && flippedCard2 != null) {
      setRoundOver(true);
      if (flippedCard1 === flippedCard2) {
        console.log("you got a match");
        setScore(score |> R.add(1));
        setSolvedCards(solvedCards |> R.append(flippedCard1.id));
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
    if (roundOver == true) {
      setFlippedCard1(null);
      setFlippedCard2(null);
      setRoundOver(false);
    }
  }, [roundOver]);

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
                  id={index}
                  key={index}
                  solvedCards={solvedCards}
                  roundOver={roundOver}
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
