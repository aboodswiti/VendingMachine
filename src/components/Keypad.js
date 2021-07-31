import React from "react";
import "regenerator-runtime";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";

import NumPad from "react-numpad";
const Keypad = ({
  location,
  setLocation,
  isItemSelected,
  setReturnedChange,
}) => {
  return ( 
    // Display the num Keypad when click on input field and Choose another item button
    // The keypad is for select item to purchase   
    <div className="numpad">
      <NumPad.Number
        onChange={(value) => setLocation(value)}
        value={location}
        decimal={false}
        negative={false}
        position={"center"}
      >
        <FormControl
          fullWidth
          margin="normal"
          error={!isItemSelected && location !== ""}
        >
          <InputLabel htmlFor="component-simple">Enter Snack Number</InputLabel>
          <Input id="component-simple" value={location} />
        </FormControl>

        <Button
          style={{
            margin: "1rem",
          }}
          variant="contained"
          color="primary"
          onClick={() => {
            setLocation("");
            setReturnedChange({});
          }}
        >
          Choose another item
        </Button>
      </NumPad.Number>
    </div>
  );
};

export default Keypad;
