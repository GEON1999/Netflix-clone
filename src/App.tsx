import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />}></Route>
        <Route path="/" element={<Home />}>
          <Route path="/movies/:movieId" element={<div>Movie</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
