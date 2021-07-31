import {render , screen, cleanup} from "@testing-library/react"
import SnackSlots from "../SnackSlots"
import renderer from "react-test-renderer"
afterEach(() => {
    cleanup();
});

test('Should render the Snack item', ()=> {
    const snack = {
        location: "11",
        item: "cola",
        price: 2.1,
        quantity: 5,
        img: "https://media.officedepot.com/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,h_1665,q_auto,w_1250/c_pad,h_1665,w_1250/v1/products/208206/208206_p?pgw=1&pgwact=1",
      }

    render(<SnackSlots item={snack}/>)
    const SnackElement = screen.getByTestId("SnackItem-11");
expect(SnackElement).toBeInTheDocument();
expect(SnackElement).toHaveTextContent("cola");
expect(SnackElement).toHaveTextContent(2.1);
expect(SnackElement).toContainHTML("<h3");


})
test('SnackSlots,Should Matches snapshot', ()=> {
    const snack = {
    location: "12",
    item: "Pepsi",
    price: 2.5,
    quantity: 5,
    img: "https://www.luluhypermarket.com/medias/424982-01.jpg-515Wx515H?context=bWFzdGVyfGltYWdlc3wxNzk0MDh8aW1hZ2UvanBlZ3xoYjcvaDZhLzk3NzU1NTIzMzE4MDYvNDI0OTgyLTAxLmpwZ181MTVXeDUxNUh8YzE5MDY0NTE5ODE3NWIyMjVmZjRmNGUyNTRjNTc5NTAzMDZjMTdmZjQwNjkxMjc5NzE0MjdiMDg3MTQwNjViYw",
  }
const tree = renderer.create(<SnackSlots item={snack}/> ).toJSON();
expect(tree).toMatchSnapshot();
} );