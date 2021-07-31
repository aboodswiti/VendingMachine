import {render , screen, cleanup} from "@testing-library/react"
import SnackMachine from "../SnackMachine"
import renderer from "react-test-renderer"

afterEach(() => {
    cleanup();
});

test('Should render Snack Machine Component', ()=> {
    render(<SnackMachine/>)
    const SnacksElement = screen.getByTestId("VM-container")
expect(SnacksElement).toBeInTheDocument()

})

