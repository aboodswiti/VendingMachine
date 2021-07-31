import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, cleanup,screen} from '@testing-library/react';
import renderer from "react-test-renderer"
import MoneySlots from "../MoneySlots"
import SnackMachine from "../SnackMachine"
import Changes from "../Changes"
afterEach(() => {
    cleanup();
});


test('Should render coin slots', ()=> {
    render(<MoneySlots/>)
    const CoinElement = screen.getByText("Coins Slots :")
expect(CoinElement).toBeInTheDocument()

})
test('Should render Notes slots', ()=> {
    render(<MoneySlots/>)
    const NotesElement = screen.getByText("Notes Slot :")
expect(NotesElement).toBeInTheDocument()

})

test('Should call addmoney', ()=> {
    const addMoney = jest.fn()
    render(<MoneySlots addMoney={addMoney} />)

    const Add20CentsButton = screen.getByTestId("coin-0.2")
    fireEvent.click(Add20CentsButton)

    expect(addMoney).toHaveBeenCalledTimes(1)
    fireEvent.click(Add20CentsButton)
    expect(addMoney).toHaveBeenCalledTimes(2)


})

test('MoneySlots, Should Matches snapshot', ()=> {
const addMoney = jest.fn()

const tree = renderer.create(<MoneySlots addMoney={addMoney} />).toJSON();
expect(tree).toMatchSnapshot();
} );



it('Available Money in state is $0 at initial state', () => {
    const { getByText } = render(<SnackMachine />);
    expect(getByText(/Available Money /i).textContent).toBe("Available Money : $0")


 })

 it('Add money by 20¢ should changes the Available Money, amount state to be $0.2', () => {
    const { getByText } = render(<SnackMachine>
                                  <MoneySlots />
                                 </SnackMachine>)
  
    expect(getByText(/Available Money /i).textContent).toBe("Available Money : $0")

    fireEvent.click(getByText("20¢"))
    expect(getByText(/Available Money /i).textContent).toBe("Available Money : $0.2")

  })
  

  it('Add money by 20¢ twice should changes the Available Money, amount state to be $0.4', () => {
    const { getByText } = render(<SnackMachine>
                                  <MoneySlots />
                                 </SnackMachine>)
  
    //expect(getByText(/Moe/i).textContent).toBe("Moe")
    expect(getByText(/Available Money /i).textContent).toBe("Available Money : $0")

    fireEvent.click(getByText("20¢"))
    expect(getByText(/Available Money /i).textContent).toBe("Available Money : $0.2")
    fireEvent.click(getByText("20¢"))
    expect(getByText(/Available Money /i).textContent).toBe("Available Money : $0.4")

    // expect(getByText(/Steve/i).textContent).toBe("Steve")
  })
  
  it('Add money by $20  should changes the Available Money, amount state to be $20', () => {
    const { getByText } = render(<SnackMachine>
                                  <MoneySlots />
                                 </SnackMachine>)
  
    expect(getByText(/Available Money /i).textContent).toBe("Available Money : $0")

    fireEvent.click(getByText("$20"))
    expect(getByText(/Available Money /i).textContent).toBe("Available Money : $20")

  })

  it('Add money by $20  should changes the AllMoney to be $270.8', () => {
    const { getByText } = render(<SnackMachine>
                                  <MoneySlots />
                                  <Changes/>
                                 </SnackMachine>)
  
    expect(getByText("$250.8").textContent).toBe("$250.8")

    fireEvent.click(getByText("$20"))
    expect(getByText("$270.8").textContent).toBe("$270.8")

  })

