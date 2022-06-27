const API_KEY = "bd49111d29b8f07a30eeed4b3c97ec34";
const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

interface IMovie {
  backdrop_path: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export interface IGetMovieResult {
  dates: { maximum: string; minimum: string };
  page: number;
  results: IMovie[];
  // IMovie interface 를 가진 array
  total_pages: number;
  total_results: number;
}
