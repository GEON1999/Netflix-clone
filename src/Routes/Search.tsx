import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { API_KEY, BASE_PATH, IGetSearchResult } from "../api";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { makeImagePath, useWindowDimensions } from "../utils";

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
  position: relative;
  height: 100vh;
`;
const Slider = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  width: 100%;
  top: 40%;
`;

const Btn = styled.button`
  position: absolute;
  padding: 10px;
  border-radius: 50%;
  background-color: ${(prop) => prop.theme.black.lighter};
  right: 10px;
  top: 850px;
`;

const Box = styled(motion.div)`
  height: 500px;
  background-color: white;
  background-position: center center;
  background-size: cover;
  border-radius: 10px;
`;

const offset = 5;

function Search() {
  const width = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data, isLoading } = useQuery<IGetSearchResult>(
    "search",
    async () =>
      await fetch(
        `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
      ).then((response) => response.json())
  );

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const increasIndex = () => {
    if (leaving) return;
    toggleLeaving();
    const maxLength = data?.results.length;
    const maxSliderLength = Math.floor(maxLength ? maxLength / offset : 1) - 1;
    setIndex((prev) => (prev === maxSliderLength ? 0 : prev + 1));
  };

  // params 중에서 특정 키워드 뒤에 오는 값을 가져옴 /search?keyworld="값"
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading....</Loader>
      ) : (
        <Cotainer>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Slider
              initial={{ x: width + 15 }}
              animate={{ x: 0 }}
              exit={{ x: -width - 15 }}
              transition={{ type: "tween", duration: 1 }}
              key={index}
            >
              {data?.results
                .slice(offset * index, offset * index + offset)
                .map((movie) => (
                  <Box
                    style={{
                      backgroundImage: movie.backdrop_path
                        ? `url(${makeImagePath(movie.backdrop_path)})`
                        : `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPQDYau3Hs4-xw1i8jVSUY4BlF4FLmg8lQqg&usqp=CAU)`,
                    }}
                  ></Box>
                ))}
            </Slider>
          </AnimatePresence>
          <Btn onClick={increasIndex}> ➡ </Btn>
        </Cotainer>
      )}
    </Wrapper>
  );
}

export default Search;
