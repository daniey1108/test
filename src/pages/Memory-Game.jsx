import React from "react";

import * as MaterialUi from "@material-ui/core";

export default function MemoryGame() {
  return (
    <>
      <MaterialUi.Box padding={2}>
        <MaterialUi.Card>
          <MaterialUi.CardHeader title="Memory Game"></MaterialUi.CardHeader>
          <MaterialUi.CardContent>
            <MaterialUi.Typography>Let's Play</MaterialUi.Typography>
          </MaterialUi.CardContent>
        </MaterialUi.Card>
      </MaterialUi.Box>
    </>
  );
}
