import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { API_KEY, BASE_PATH, IGetSearchResult } from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import Slider from "../components/Slider";
import { useEffect, useState } from "react";
import SearchDetail from "../components/SearchMovieDetail";
import SearchMovieDetail from "../components/SearchMovieDetail";
import SearchTvDetail from "../components/SearchTvDetail";

const Wrapper = styled.div`
  background-color: ${(prop) => prop.theme.black.veryDark};
`;
const Loader = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 800;
`;

const Cotainer = styled(motion.div)`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50vh;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data: movieData, isLoading } = useQuery<IGetSearchResult>(
    "search movie",
    async () =>
      await fetch(
        `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}`
      ).then((response) => response.json())
  );
  const { data: tvData } = useQuery<IGetSearchResult>(
    "search tv",
    async () =>
      await fetch(
        `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko-KR&query=${keyword}`
      ).then((response) => response.json())
  );
  const [isMovie, setIsMovie] = useState(false);
  const [isTv, setIsTv] = useState(false);
  console.log(location.pathname.slice(0, 10));
  useEffect(() => {
    if (location.pathname.slice(0, 13) === "/search/movie") {
      setIsMovie(true);
    }
    if (location.pathname.slice(0, 13) !== "/search/movie") {
      setIsMovie(false);
    }
  }, [location]);
  useEffect(() => {
    if (location.pathname.slice(0, 10) === "/search/tv") {
      setIsTv(true);
    }
    if (location.pathname.slice(0, 10) !== "/search/tv") {
      setIsTv(false);
    }
  }, [location]);
  // params 중에서 특정 키워드 뒤에 오는 값을 가져옴 /search?keyworld="값"
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading....</Loader>
      ) : (
        <Cotainer>
          <Slider
            data={movieData?.results ?? []}
            title="검색된 영화"
            path="/search/movie"
          ></Slider>
          <Slider
            data={tvData?.results ?? []}
            title="검색된 시리즈"
            path="/search/tv"
          ></Slider>
        </Cotainer>
      )}
      {isMovie === true ? (
        <SearchMovieDetail
          path="/search/movie"
          movieId={location.pathname.slice(14)}
        />
      ) : null}
      {isTv === true ? (
        <SearchTvDetail path="/search/tv" tvId={location.pathname.slice(11)} />
      ) : null}
    </Wrapper>
  );
}

export default Search;
