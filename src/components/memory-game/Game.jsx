import React from "react";
import * as R from "ramda";

import * as MaterialUi from "@material-ui/core";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
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
          |> R.concat((tiles |> R.dropLast(6)))
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
    color: "#000000",
    title: "blackTile",
    flipped: false,
  },
  {
    color: "#FFFFFF",
    title: "whiteTile",
    flipped: false,
  },
  {
    color: "#FF0000",
    title: "redTile",
    flipped: false,
  },
  {
    color: "#00FF00",
    title: "greenTile",
    flipped: false,
  },
  {
    color: "#800080",
    title: "purpleTile",
    flipped: false,
  },
  {
    color: "#FFA500",
    title: "orangeTile",
    flipped: false,
  },
  {
    color: "#FFFF00",
    title: "yellowTile",
    flipped: false,
  },
  {
    color: "#0000FF",
    title: "blueTile",
    flipped: false,
  },
];
