import React from "react";
import * as R from "ramda";

import * as MaterialUi from "@material-ui/core";
import StarOutlineIcon from "@material-ui/icons/StarOutline";

export default function Game({ score, setScore, gameMode }) {
  const mapWithIndex = R.addIndex(R.map);
  const [turnOver, setTurnOver] = React.useState(false);
  const [flippedTile1, setFlippedTile1] = React.useState(null);
  const [flippedTile2, setFlippedTile2] = React.useState(null);

  const handleFlip = (tile) => {
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

  return (
    <>
      <MaterialUi.Box>
        {gameMode === "easy" && (
          <>
            <MaterialUi.Typography>Easy Mode!</MaterialUi.Typography>
            <MaterialUi.Box padding={2} bgcolor="#2286c3">
              <MaterialUi.Grid
                container
                spacing={2}
                alignContent="space-between"
                justify="center"
                alignItems="center"
              >
                {tiles
                  |> R.dropLast(6)
                  |> R.concat((tiles |> R.dropLast(6)))
                  |> mapWithIndex((tile, index) => (
                    <MaterialUi.Grid key={index} item xs={3}>
                      <MaterialUi.Button
                        variant="contained"
                        onClick={() => handleFlip(tile)}
                      >
                        <StarOutlineIcon />
                      </MaterialUi.Button>
                    </MaterialUi.Grid>
                  ))}
              </MaterialUi.Grid>
            </MaterialUi.Box>
          </>
        )}
        {gameMode === "hard" && (
          <>
            <MaterialUi.Typography>Hard Mode!</MaterialUi.Typography>
            <MaterialUi.Box padding={2} bgcolor="#2286c3">
              <MaterialUi.Grid
                container
                spacing={2}
                alignContent="space-between"
                justify="center"
                alignItems="center"
              >
                {tiles
                  |> R.concat(tiles)
                  |> mapWithIndex((tile, index) => (
                    <MaterialUi.Grid key={index} item xs={3}>
                      <MaterialUi.Button
                        variant="contained"
                        onClick={() => handleFlip(tile)}
                      >
                        <StarOutlineIcon />
                      </MaterialUi.Button>
                    </MaterialUi.Grid>
                  ))}
              </MaterialUi.Grid>
            </MaterialUi.Box>
          </>
        )}
      </MaterialUi.Box>
    </>
  );
}

const tiles = [
  {
    color: "#000000",
    title: "blackTile",
  },
  {
    color: "#FFFFFF",
    title: "whiteTile",
  },
  {
    color: "#FF0000",
    title: "redTile",
  },
  {
    color: "#00FF00",
    title: "greenTile",
  },
  {
    color: "#800080",
    title: "purpleTile",
  },
  {
    color: "#FFA500",
    title: "orangeTile",
  },
  {
    color: "#FFFF00",
    title: "yellowTile",
  },
  {
    color: "#0000FF",
    title: "blueTile",
  },
];
