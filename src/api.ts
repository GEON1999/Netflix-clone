export const API_KEY = "bd49111d29b8f07a30eeed4b3c97ec34";
export const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function popularMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function onAirTv() {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function topRatedTv() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export interface IMovie {
  backdrop_path: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date?: string;
  vote_average?: number;
  name?: string;
}

export interface IGetMovieResult {
  dates: { maximum: string; minimum: string };
  page: number;
  results: IMovie[];
  // IMovie interface 를 가진 array
  total_pages: number;
  total_results: number;
}

interface ISearch {
  backdrop_path: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export interface IGetSearchResult {
  results: ISearch[];
}
