import React from "react";
import * as R from "ramda";

import * as MaterialUi from "@material-ui/core";

export default function Game({ score, setScore, gameMode }) {
  const [gamePieces, setGamePieces] = React.useState([]);

  React.useEffect(() => {
    if (gameMode === "easy") {
      var singlePieces = R.dropLast(6, tiles);
      setGamePieces(R.concat(singlePieces, singlePieces));
    }
  }, gameMode);
  return (
    <>
      <MaterialUi.Box padding={2} bgcolor="#2286c3">
        <MaterialUi.Grid container spacing={2}>
          {R.map(
            (tile) => (
              <MaterialUi.Grid key={tile.title} item xs={3}>
                <MaterialUi.Button variant="contained">
                  {tile.title}
                </MaterialUi.Button>
              </MaterialUi.Grid>
            ),
            gamePieces
          )}
        </MaterialUi.Grid>
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
