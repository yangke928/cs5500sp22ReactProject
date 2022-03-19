import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";

const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
];

const MOCKED_TUITS = [
  {tuit: "ripley's tuit", postedBy:"123", _id:"er123"},
  {tuit: "conor's tuit",postedBy:"234", _id:"sc234"}
];

test('tuit list renders static tuit array', () => {
    render(
        <HashRouter>
          <Tuits tuits={MOCKED_TUITS}/>
        </HashRouter>);
    const linkElementConor = screen.getByText(/conor's tuit/i);
    const linkElementRipley = screen.getByText(/ripley's tuit/i);
    expect(linkElementConor).toBeInTheDocument();
    expect(linkElementRipley).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
      <HashRouter>
        <Tuits tuits = {tuits}/>
      </HashRouter>
  )
  const linkElement = screen.getByText(/po 789/i);
  expect(linkElement).toBeInTheDocument();
})


//
// test('tuit list renders mocked', async () => {
//   // TODO: implement this
// });
