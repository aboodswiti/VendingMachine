import React from "react";

//  Display All Snacks and Selected snack by get the item as props from SnackMachine
//  item is Object, item = { location: , item: , price: ,quantity: ,  img:  }

const SnackSlots = ({ item }) => {
  return (
    <div data-testid={`SnackItem-${item.location}`} className="item">
      <img className="item__img" src={item.img} alt="item" />
      <div className="item__info">
        <h3>{item.item}</h3>
        <h3>${item.price}</h3>
      </div>
      <h3 className="item__quantity">#{item.quantity}</h3>
      <h3 className="item__location">{item.location}</h3>
    </div>
  );
};

export default SnackSlots;
