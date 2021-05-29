import React from "react";
import * as R from "ramda";

import * as MaterialUi from "@material-ui/core";

import gameCard1 from "../../images/gameCard1.jpg";
import gameCard2 from "../../images/gameCard2.jpg";
import gameCard3 from "../../images/gameCard3.jpg";
import gameCard4 from "../../images/gameCard4.jpg";
import gameCard5 from "../../images/gameCard5.jpg";
import gameCard6 from "../../images/gameCard6.PNG";
import gameCard7 from "../../images/gameCard7.jpg";
import gameCard8 from "../../images/gameCard8.jpg";

const flippedImage = R.cond([
  [R.equals("gameCard1"), R.always(gameCard1)],
  [R.equals("gameCard2"), R.always(gameCard2)],
  [R.equals("gameCard3"), R.always(gameCard3)],
  [R.equals("gameCard4"), R.always(gameCard4)],
  [R.equals("gameCard5"), R.always(gameCard5)],
  [R.equals("gameCard6"), R.always(gameCard6)],
  [R.equals("gameCard7"), R.always(gameCard7)],
  [R.equals("gameCard8"), R.always(gameCard8)],
]);

export default function Card({ currentCard, handleFlip }) {
  const [flipped, setFlipped] = React.useState(currentCard.flipped);

  const flip = () => {
    setFlipped(true);
  };
  return (
    <>
      <MaterialUi.Grid item md={3} xs={12}>
        <MaterialUi.Card
          variant="elevation"
          style={{ minHeight: "150px", minWidth: "200px" }}
        >
          <MaterialUi.CardContent>
            <MaterialUi.CardMedia
              component="img"
              image={currentCard.id |> flippedImage}
              alt={currentCard.altText}
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
