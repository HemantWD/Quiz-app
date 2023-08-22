import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Game } from "./Pages/Game";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/game" Component={Game} />
      </Routes>
    </>
  );
}

export default App;
