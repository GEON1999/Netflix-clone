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
        <Route path="/tv" element={<Tv />}>
          <Route path="/tv/:movieId" element={<div>Tv</div>} />
        </Route>
        <Route path="/search" element={<Search />}>
          <Route
            path="/search/movie/:movieId"
            element={<div>Search Movie</div>}
          />
          <Route path="/search/tv/:tvId" element={<div>Search Tv</div>} />
        </Route>
        <Route path="/" element={<Home />}>
          <Route path="/movies/:movieId" element={<div>Movie</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
