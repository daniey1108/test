import React from "react";
import * as R from "ramda";

import * as MaterialUi from "@material-ui/core";
import StarOutlineIcon from "@material-ui/icons/StarOutline";

export default function GamePiece({ tile, handleFlip }) {
  return (
    <>
      <MaterialUi.Grid item xs={3}>
        <MaterialUi.Button
          variant="contained"
          onClick={() => handleFlip(tile)}
          size="large"
          style={{ minHeight: "150px", minWidth: "200px" }}
        >
          {tile.flipped ? (
            <StarOutlineIcon color="disabled" />
          ) : (
            <StarOutlineIcon />
          )}
        </MaterialUi.Button>
      </MaterialUi.Grid>
    </>
  );
}
