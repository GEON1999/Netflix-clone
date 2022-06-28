import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_KEY, BASE_PATH } from "../api";
import { makeImagePath } from "../utils";

const ClickedMovieContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ClickedMovie = styled(motion.div)`
  position: relative;
  margin: 40px auto;
  width: 960px;
  max-width: calc(100% - 40px);
  height: calc(100% - 80px);
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

interface DetailProps {
  backdrop_path: string;
  genres: [];
  tagline: string;
  vote_average: number;
  release_date: string;
  title: string;
  overview: string;
}

function MovieDetail() {
  const { data, isLoading } = useQuery<DetailProps>(["movies", "detail"], () =>
    fetch(
      `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
    ).then((response) => response.json())
  );
  console.log(data);
  const navigate = useNavigate();
  const clickedMovieMatch = useMatch("/movies/:movieId");
  const movieId = clickedMovieMatch?.params.movieId;
  /*const selectedMovie =clickedMovieMatch?.params.movieId
    clickedMovieMatch?.params.movieId &&
    data?.find(
      (movie) => String(movie.id) === clickedMovieMatch?.params.movieId
    );
find() 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환합니다.그런 요소가 없다면 undefined를 반환합니다.
    */

  const onOverpageClicked = () => {
    navigate(`/`);
  };
  return (
    <>
      {isLoading ? (
        <h1>Loading..</h1>
      ) : (
        <AnimatePresence>
          {clickedMovieMatch ? (
            <>
              <ClickedMovieContainer>
                <OverPage
                  onClick={onOverpageClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <ClickedMovie layoutId={String(movieId)}>
                  {data && (
                    <>
                      <SelectedMovieImg
                        style={{
                          backgroundImage: `linear-gradient(transparent, rgb(24,24,24)) ,url(${makeImagePath(
                            data?.backdrop_path
                          )})`,
                        }}
                      />
                      <SelectedMovieDetail>
                        <SelectedMovieTitle>{data.title}</SelectedMovieTitle>
                        <SelectedMovieSum>{data.overview}</SelectedMovieSum>
                      </SelectedMovieDetail>
                    </>
                  )}
                </ClickedMovie>
              </ClickedMovieContainer>
            </>
          ) : null}
        </AnimatePresence>
      )}
    </>
  );
}

export default MovieDetail;
