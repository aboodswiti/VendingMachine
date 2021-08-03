import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import MoneySlots from "../MoneySlots";
import SnackMachine from "../SnackMachine";
import ChangeMaking from "../ChangeMaking";

import Changes from "../Changes";
afterEach(() => {
  cleanup();
});
it("Add money by $50  should changes the AllMoney to be $300.8", () => {
  const { getByText } = render(
    <SnackMachine>
      <ChangeMaking />
       <MoneySlots />
      <Changes />
    </SnackMachine>
  );
  expect(getByText("$250.8").textContent).toBe("$250.8");

  fireEvent.click(getByText("$50"));
  expect(getByText("$300.8").textContent).toBe("$300.8");
  expect(getByText(/Get Your money/i).textContent).toBe("Get Your money $50")



});
it("Add money by $50 and click button to get your money back", () => {
    const { getByText } = render(
      <SnackMachine>
        <ChangeMaking />
         <MoneySlots />
        <Changes />
      </SnackMachine>
    );
    expect(getByText("$250.8").textContent).toBe("$250.8");
  
    fireEvent.click(getByText("$50"));
    expect(getByText("$300.8").textContent).toBe("$300.8");
    expect(getByText(/Get Your money/i).textContent).toBe("Get Your money $50")
    fireEvent.click(getByText(/Get Your money/i));
    expect(getByText("$250.8").textContent).toBe("$250.8");
    expect(getByText("Change :")).toBeInTheDocument();
  
  
  });
