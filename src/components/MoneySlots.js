import React from "react";
import { Button } from "@material-ui/core";

const MoneySlots = ({ addMoney }) => {
  let notes = [20, 50];
  let coins = [0.1, 0.2, 0.5, 1];
  
 // display the coin and note slots 
  return (
    <div className="moneySlots">
      <div className="CoinSlot">
        <h2> Coins Slots : </h2>

        {coins.map((coin, i) => (
          <Button
            key={i}
            data-testid={`coin-${coin}`}
            style={{
              height: "3.5rem",
              margin: "9px",
              borderRadius: "60%",
              fontSize: "1.1rem",
            }}
            variant="contained"
            color="secondary"
            onClick={() => addMoney(coin)}
          >
            {coin < 1 ? `${coin * 100}¢` : `$${coin}`}
          </Button>
        ))}
      </div>
      <div className="NotesSlot ">
        <h2> Notes Slot : </h2>

        {notes.map((note, i) => (
          <Button
            key={i}
            style={{
              margin: "9px",
              fontSize: "1.5rem",
            }}
            variant="outlined"
            color="secondary"
            onClick={() => addMoney(note)}
          >
            {`$${note}`}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoneySlots;
