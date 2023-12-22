import Menu from "./components/Menu";
import TicTacToe from "./components/TicTacToe";
import BigEatSmall from "./components/BigEatSmall";
import homeIcon from "./home.svg";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  function reset() {
    let bodyThemes = document.body.classList;
    bodyThemes.forEach(theme => bodyThemes.remove(theme));
  }
  return (
    <div className="App">
      <BrowserRouter >
      <div className="home_button" onClick={() => reset()}><Link to="/"><img src={homeIcon} width={64} /></Link></div>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/ticTacToe" element={<TicTacToe />} />
          <Route path="/bigEatSmall" element={<BigEatSmall />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;