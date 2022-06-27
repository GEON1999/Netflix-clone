import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMovieResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Banner = styled(motion.div)<{ bg: string }>`
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(prop) => prop.bg});
  background-size: cover;
`;

const Title = styled.span`
  margin-bottom: 20px;
  font-size: 48px;
  font-weight: 800;
`;

const Overview = styled.span`
  font-size: 22px;
  width: 35%;
`;

const Loader = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 800;
`;

const Slider = styled(motion.div)`
  position: relative;
`;

const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  bottom: 40px;
`;
const Box = styled(motion.div)<{ bg: string }>`
  background-color: white;
  color: red;
  height: 200px;
  font-size: 10px;
  background-image: url(${(prop) => prop.bg});
  background-size: cover;
  border-radius: 5px;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const rowVariant = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

const boxVariant = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.4,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariant = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.3,
      type: "tween",
    },
  },
};

const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.darker};
  padding: 15px 0px;
  position: absolute;
  bottom: 0;
  width: 100%;
  opacity: 0;
  h4 {
    text-align: center;
    color: white;

    font-size: 16px;
  }
`;

const ClickedMovie = styled(motion.div)`
  width: 40vw;
  height: 80vh;
  position: absolute;
  right: 0;
  left: 0;
  margin: 0 auto;
  background-color: ${(prop) => prop.theme.black.darker};
  border-radius: 10px;
  overflow: hidden;
`;

const OverPage = styled(motion.div)`
  top: 0;
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const SelectedMovieImg = styled(motion.div)`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 40vh;
`;

const SelectedMovieDetail = styled(motion.div)`
  padding: 20px;
  position: relative;
`;
const SelectedMovieTitle = styled(motion.span)`
  position: absolute;
  top: -100px;
  font-weight: 800;
  font-size: 30px;
`;
const SelectedMovieSum = styled(motion.span)``;
const offset = 6;

function Home() {
  const { scrollY } = useViewportScroll();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const clickedMovieMatch = useMatch("/movies/:movieId");
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const selectedMovie =
    clickedMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === clickedMovieMatch?.params.movieId
    );
  //find() 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환합니다.그런 요소가 없다면 undefined를 반환합니다.

  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const maxLength = data.results.length;
      const maxSliderLength = Math.floor(maxLength / offset) - 1;
      setIndex((prev) => (prev === maxSliderLength ? 0 : prev + 1));
    }
  };

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const onOverpageClicked = () => {
    navigate(`/`);
  };
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bg={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      onClick={() => onBoxClicked(movie.id)}
                      key={movie.id}
                      bg={makeImagePath(movie.poster_path, "w500")}
                      variants={boxVariant}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                    >
                      <Info variants={infoVariant}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {clickedMovieMatch ? (
              <>
                <OverPage
                  onClick={onOverpageClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <ClickedMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={String(clickedMovieMatch.params.movieId)}
                >
                  {selectedMovie && (
                    <>
                      <SelectedMovieImg
                        style={{
                          backgroundImage: `linear-gradient(transparent, rgb(24,24,24)) ,url(${makeImagePath(
                            selectedMovie.backdrop_path
                          )})`,
                        }}
                      />
                      <SelectedMovieDetail>
                        <SelectedMovieTitle>
                          {selectedMovie.title}
                        </SelectedMovieTitle>
                        <SelectedMovieSum>
                          {selectedMovie.overview}
                        </SelectedMovieSum>
                      </SelectedMovieDetail>
                    </>
                  )}
                </ClickedMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
