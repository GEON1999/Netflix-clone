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
  margin: 70px auto;
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

const SelectMovImg = styled(motion.div)`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 40vh;
`;

const SelectMovDetail = styled(motion.div)`
  padding: 20px;
  position: relative;
`;
const SelectMovTitle = styled(motion.div)`
  position: absolute;
  top: -140px;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 800;
    font-size: 30px;
  }
  span {
    margin-top: 10px;
    margin-left: 20px;
    font-size: 17px;
    opacity: 0.8;
  }
`;
const SelectMovSum = styled(motion.span)`
  position: absolute;
  top: 70px;
  width: 70%;
`;

const SelectMovSub = styled.div`
  position: absolute;
  top: -70px;
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  opacity: 0.8;
  font-size: 15px;
  span {
    margin: 2px 0px;
  }
`;

const SelectMovGenreBox = styled.div`
  background-color: ${(prop) => prop.theme.black.lighter};
  border-radius: 5px;
  opacity: 0.8;
  margin-right: 10px;
`;

const SelectMovGenre = styled.div`
  display: flex;
  top: 0px;

  margin-bottom: 10px;
  span {
    font-size: 13px;
    margin: 10px;
    opacity: 1;
  }
`;

interface IGenre {
  name: string;
}

interface DetailProps {
  backdrop_path: string;
  genres: IGenre[];
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
  /*const SelectMov =clickedMovieMatch?.params.movieId
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
                      <SelectMovImg
                        style={{
                          backgroundImage: `linear-gradient(transparent, rgb(24,24,24)) ,url(${makeImagePath(
                            data?.backdrop_path
                          )})`,
                        }}
                      />
                      <SelectMovDetail>
                        <SelectMovTitle>
                          <SelectMovGenre>
                            {data.genres.map((genre) => (
                              <SelectMovGenreBox>
                                <span>{genre.name}</span>
                              </SelectMovGenreBox>
                            ))}
                          </SelectMovGenre>
                          <div style={{ display: "flex" }}>
                            <h1>{data.title}</h1>
                            <span> {data.release_date.slice(0, 4)}</span>
                          </div>
                        </SelectMovTitle>
                        <SelectMovSub>
                          <span>{data.tagline}</span>
                          <span>⭐{data.vote_average?.toFixed(1)}</span>
                        </SelectMovSub>

                        <SelectMovSum>{data.overview}</SelectMovSum>
                      </SelectMovDetail>
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
