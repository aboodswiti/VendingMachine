import React from "react";
import {cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";


import Changes from "../Changes";
afterEach(() => {
  cleanup();
});



  test('Changes,Should Matches snapshot', ()=> {
    const returnedChange = { 50:1}
    const availableChange = {1: 17,
      20: 4,
      50: 3,
      0.1: 8,
      0.2: 5,
      0.5: 4,}

const tree = renderer.create(<Changes returnedChange={returnedChange} availableChange={availableChange} />).toJSON();

expect(tree).toMatchSnapshot();
} );