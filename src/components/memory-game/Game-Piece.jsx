import React from "react";
import * as R from "ramda";

import * as MaterialUi from "@material-ui/core";
import StarOutlineIcon from "@material-ui/icons/StarOutline";

import gametile1 from "../../images/gametile1.jpg";
import gametile2 from "../../images/gametile2.jpg";
import gametile3 from "../../images/gametile3.jpg";
import gametile4 from "../../images/gametile4.jpg";
import gametile5 from "../../images/gametile5.jpg";
import gametile6 from "../../images/gametile6.PNG";
import gametile7 from "../../images/gametile7.jpg";
import gametile8 from "../../images/gametile8.jpg";

const flippedImage = R.cond([
  [R.equals("gametile1"), R.always(gametile1)],
  [R.equals("gametile2"), R.always(gametile2)],
  [R.equals("gametile3"), R.always(gametile3)],
  [R.equals("gametile4"), R.always(gametile4)],
  [R.equals("gametile5"), R.always(gametile5)],
  [R.equals("gametile6"), R.always(gametile6)],
  [R.equals("gametile7"), R.always(gametile7)],
  [R.equals("gametile8"), R.always(gametile8)],
]);

export default function GamePiece({ tile, handleFlip }) {
  const [flipped, setFlipped] = React.useState(tile.flipped);

  const flip = () => {
    setFlipped(true);
  };
  return (
    <>
      <MaterialUi.Grid item xs={3}>
        <MaterialUi.Card
          variant="outlined"
          style={{ minHeight: "150px", minWidth: "200px" }}
        >
          <MaterialUi.CardContent>
            <MaterialUi.CardMedia
              component="img"
              image={tile.id |> flippedImage}
              alt={tile.altText}
              onClick={() => {
                handleFlip();
                flip();
              }}
            />
          </MaterialUi.CardContent>
        </MaterialUi.Card>
      </MaterialUi.Grid>
    </>
  );
}
