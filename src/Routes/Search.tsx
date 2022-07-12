import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { API_KEY, BASE_PATH, IGetSearchResult } from "../api";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { makeImagePath, useWindowDimensions } from "../utils";
import Slider from "../components/Slider";
import MovieDetail from "../components/MovieDetail";
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
  margin-top: 400px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IGetSearchResult>(
    "search",
    async () =>
      await fetch(
        `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}`
      ).then((response) => response.json())
  );

  // params 중에서 특정 키워드 뒤에 오는 값을 가져옴 /search?keyworld="값"
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading....</Loader>
      ) : (
        <Cotainer>
          <Slider data={data?.results ?? []} title="검색된 영화"></Slider>
        </Cotainer>
      )}
    </Wrapper>
  );
}

export default Search;
