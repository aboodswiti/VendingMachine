import React, { useState, useEffect } from "react";
import { snacks } from "../snacks";
import SnackSlots from "./SnackSlots";
import MoneySlots from "./MoneySlots";
import Keypad from "./Keypad";
import { Button } from "@material-ui/core";
import ChangeMaking from "./ChangeMaking";
import Changes from "./Changes";
const SnackMachine = () => {
  const [location, setLocation] = useState("");
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [res, setRes] = useState(Array);
  const [amount, setAmount] = useState(0);
  const [isEnough, setIsEnough] = useState(false);
  const [change, setChange] = useState(Number);
  const [returnedChange, setReturnedChange] = useState(Number);
  const [isThereChange, setIsThereChange] = useState(false);
  const [allMoney, setAllMoney] = useState(0);
  const [items, setItems] = useState([...snacks]);
  const [availableChange, setavailableChange] = useState({
    1: 17,
    20: 4,
    50: 3,
    0.1: 8,
    0.2: 5,
    0.5: 4,
  });

  useEffect(() => {
    let result = items.filter((item) => item.location === location); // get selected snack
    let sum = 0;
    setItems(    // If(quantity = 0) the item is sold out , display Sold out img of this item  
      items.map((item) =>
        item.quantity === 0
          ? {
              ...item,
              img: "https://toppng.com/uploads/preview/sold-out-stamp-11523435603ivg6vbqdjd.png",
            }
          : item
      )
    );
    if (  // check it the item not exist 
      result.length === 0 ||
      result[0] === "undefined" ||
      result[0].quantity === 0
    )
      setIsItemSelected(false);
    else setIsItemSelected(true);
    if (isItemSelected && amount >= res.price) { // Validate item price and insert money & calculate the change
      setIsEnough(true);
      let change = amount - res.price;
      setChange(parseFloat(change.toFixed(2), 10));
    } else setIsEnough(false);

    setRes(result[0]);
    Object.entries(availableChange).map( // calculate total money inside Vending machine
      ([key, val]) => (sum = sum + key * val)
    );
    setAllMoney(parseFloat(sum.toFixed(2), 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res, amount, location, isItemSelected, isEnough, availableChange]);

  const addMoney = (value) => { // to add money to vending mashine when customer insert money
    let money = amount + value;
    setAmount(parseFloat(money.toFixed(2), 10)); 

    setavailableChange((prevState) => ({ // update the availableChange with money type inside VM when insert money
      ...prevState,
      [value]: availableChange[value] + 1,
    }));
  };

  const purchaseItem = (location, quantity) => { // purchase the item and update the quantity of this item
    setAmount(change);
    setRes((res.length = 0));
    setLocation("");
    setItems(
      items.map((item) =>
        item.location === location ? { ...item, quantity: quantity - 1 } : item
      )
    );
  };

  return (
    <div data-testid="VM-container" className="container">
      {items.map((item, i) => (  // display all snacks 
        <div className="item" key={i}>
          <SnackSlots key={i} item={item} />
        </div>
      ))}
      <div className="vm_container">
        <div className="Selected-item">  
          {isItemSelected ? ( // display the selected snack
            <SnackSlots key={location} item={res} />
          ) : location !== "" ? (
            <p> Does not exist! </p> //  display this message if the selected item does not exist
          ) : null}
          <h2 data-testid="AvailableMoney">Available Money : ${amount}</h2>  

          {isEnough ? ( // Hide Purchase button if the money is not Enough
            <div>
              <Button
                disabled={!isThereChange}
                style={{ margin: "1rem" }}
                variant="outlined"
                color="secondary"
                onClick={() => purchaseItem(res?.location, res?.quantity)}
              >
                Purchase the {res?.item}
              </Button>
            </div>
          ) : null}

          <ChangeMaking
            availableChange={availableChange}
            change={change}
            isItemSelected={isItemSelected}
            setavailableChange={setavailableChange}
            setAmount={setAmount}
            setIsThereChange={setIsThereChange}
            isThereChange={isThereChange}
            amount={amount}
            location={location}
            setReturnedChange={setReturnedChange}
            isEnough={isEnough}
            setLocation={setLocation}
          />
        </div>

        <Keypad
          location={location}
          setLocation={setLocation}
          isItemSelected={isItemSelected}
          setReturnedChange={setReturnedChange}
        />
        <MoneySlots addMoney={addMoney} />
      </div>
      <Changes
        allMoney={allMoney}
        availableChange={availableChange}
        returnedChange={returnedChange}
      />
    </div>
  );
};

export default SnackMachine;
