import React from "react";
import * as R from "ramda";

import * as MaterialUi from "@material-ui/core";
import GamePiece from "./Game-Piece.jsx";

export default function Game({ score, setScore, gameMode }) {
  const mapWithIndex = R.addIndex(R.map);
  const [turnOver, setTurnOver] = React.useState(false);
  const [flippedTile1, setFlippedTile1] = React.useState(null);
  const [flippedTile2, setFlippedTile2] = React.useState(null);
  const [gamePieces, setGamePieces] = React.useState([]);

  const handleFlip = (tile) => {
    var flipLensProp = R.lensProp("flipped");
    R.set(flipLensProp, true, tile);
    if (flippedTile1 == null && flippedTile2 == null) {
      setFlippedTile1(tile.title);
      console.log("flipping over the ...", tile.title, "tile1");
    }
    if (flippedTile1 != null && flippedTile2 == null) {
      setFlippedTile2(tile.title);
      console.log("flipping over the ...", tile.title, "tile2");
    }
  };

  React.useEffect(() => {
    if (flippedTile1 != null && flippedTile2 != null) {
      setTurnOver(true);
      if (flippedTile1 === flippedTile2) {
        console.log("you got a match");
        setScore(score |> R.add(1));
        console.log("score:", score |> R.add(1));
      } else {
        console.log("you did not get a match");
      }
    }
  }, [flippedTile2]);

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
    if (turnOver == true) {
      setFlippedTile1(null);
      setFlippedTile2(null);
      setTurnOver(false);
    }
  }, [turnOver]);

  React.useEffect(() => {
    if (gameMode === "easy") {
      setGamePieces(
        tiles
          |> R.dropLast(6)
          |> R.concat((tiles |> R.dropLast(6)))
          |> R.sort(() => Math.random() - 0.5)
      );
    } else if (gameMode === "medium") {
      setGamePieces(
        tiles
          |> R.dropLast(2)
          |> R.concat((tiles |> R.dropLast(2)))
          |> R.sort(() => Math.random() - 0.5)
      );
    } else if (gameMode === "hard") {
      setGamePieces(
        tiles |> R.concat(tiles) |> R.sort(() => Math.random() - 0.5)
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
          <MaterialUi.Grid container spacing={2}>
            {gamePieces
              |> mapWithIndex((tile, index) => (
                <GamePiece
                  tile={tile}
                  handleFlip={() => handleFlip(tile)}
                  key={index}
                />
              ))}
          </MaterialUi.Grid>
        </MaterialUi.Box>
      </MaterialUi.Box>
    </>
  );
}

const tiles = [
  {
    id: "gametile1",
    altText: "Castiel Cat",
    title: "blackTile",
    flipped: false,
  },
  {
    id: "gametile2",
    altText: "Crowley with a Hat",
    title: "whiteTile",
    flipped: false,
  },
  {
    id: "gametile3",
    altText: "Crowley and Castiel following Pizza",
    title: "redTile",
    flipped: false,
  },
  {
    id: "gametile4",
    altText: "Crowley and Castiel Cuddling",
    title: "greenTile",
    flipped: false,
  },
  {
    id: "gametile5",
    altText: "Crowley and Castiel cuddling",
    title: "purpleTile",
    flipped: false,
  },
  {
    id: "gametile6",
    altText: "Crowley with Easter Bunny Ears",
    title: "orangeTile",
    flipped: false,
  },
  {
    id: "gametile7",
    altText: "Castiel looking off in space",
    title: "yellowTile",
    flipped: false,
  },
  {
    id: "gametile8",
    altText: "Crowley and Castiel Cuddling",
    title: "blueTile",
    flipped: false,
  },
];
