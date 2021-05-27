import React from "react";

import * as MaterialUi from "@material-ui/core";
import GameLayout from "../components/memory-game/Game-Layout";

export default function MemoryGame() {
  return (
    <>
      <MaterialUi.Box padding={2}>
        <MaterialUi.Card>
          <MaterialUi.CardHeader title="Memory Game"></MaterialUi.CardHeader>
          <MaterialUi.CardContent>
            <GameLayout />
          </MaterialUi.CardContent>
        </MaterialUi.Card>
      </MaterialUi.Box>
    </>
  );
}
