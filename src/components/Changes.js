import React from "react";

const Changes = ({ allMoney, availableChange, returnedChange }) => {
  // Display Total money & availableChange inside VM
  return (
    <div className="changes">
      <div>
        {Object.keys(returnedChange).length ? <p>Change : </p> : null}
        {Object.entries(returnedChange).map(([key, val]) => (
          <p key={key}>
            ${key}: {val}
          </p>
        ))}
      </div>

      <p>
        Available
        <br />
        Change :
      </p>
      <h2>${allMoney}</h2>

      <h4> $Type : #Amount </h4>
      {Object.entries(availableChange).map(([key, val]) => (
        <h3 key={key}>
          ${key}: {val}
        </h3>
      ))}
    </div>
  );
};

export default Changes;
