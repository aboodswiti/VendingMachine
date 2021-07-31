import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

const ChangeMaking = ({
  availableChange,
  change,
  isItemSelected,
  setavailableChange,
  setAmount,
  setIsThereChange,
  isThereChange,
  amount,
  setReturnedChange,
  isEnough,
  setLocation,
}) => {
  const [notEnoughMsg, setNotEnoughMsg] = useState("");
  let bills = [0.1, 0.2, 0.5, 1, 20, 50];

  useEffect(() => {
    // call the returnMoney() if change or SelectedItem is updated

    returnMoney(false, change);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change, isItemSelected]);

  const returnMoney = (isPurchase, money) => {
    // this function to check if the available change is enough ;
    // create the returned change object with type and amount
    // update the availableChange if change is enough and item purchased
    let index = bills.length - 1;
    let counter = 0;
    let newChange = { ...availableChange };
    const returnedChange = {};

    while (money >= bills[0] && index !== -1) {
      if (
        money >= bills[index] &&
        counter < availableChange[bills[index]] &&
        availableChange[bills[index]] !== 0
      ) {
        money -= bills[index];
        money = parseFloat(money.toFixed(2), 10);
        counter++;
        returnedChange[bills[index]] = counter;
        newChange[bills[index]] = newChange[bills[index]] - 1;
      } else {
        counter = 0;
        index--;
      }
    }
    if (money === 0) {
      setIsThereChange(true);
      if (isPurchase) {
        setavailableChange(newChange);
        setReturnedChange(returnedChange);
        setAmount(0);
      }
    } else {
      setNotEnoughMsg(`There is No Enough Change For ${change}$`);
      setIsThereChange(false);
    }
  };

  return (
    // display notEnoughMsg if the available change is not enough ;
    <div className="ChangeMaking">
      {!isThereChange && isItemSelected && isEnough ? (
        <h4> {notEnoughMsg} </h4>
      ) : null}

      <Button
        disabled={!amount}
        variant="contained"
        color="secondary"
        onClick={() => {
          returnMoney(true, amount);
          setLocation("");
        }}
      >
        Get Your money ${amount}
      </Button>
    </div>
  );
};
export default ChangeMaking;
