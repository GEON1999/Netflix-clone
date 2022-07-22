import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
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
const OverviwTitle = styled.div`
  margin-top: 20px;
  font-weight: 800;
  font-size: 20px;
`;

const SelectMovSum = styled(motion.div)`
  margin-top: 20px;
  font-size: 15px;
`;

const SelectMovSub = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  top: -70px;
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  font-size: 18px;
  opacity: 0.8;
  span {
    &:first-child {
      margin-top: 10px;
      font-style: oblique;
    }
    &:nth-child(2) {
      position: relative;
      margin-right: 40px;
      bottom: 5px;
      font-size: 25px;
    }
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
const ActorTitle = styled.div`
  margin-top: 50px;
  font-weight: 800;
  font-size: 20px;
`;

const ActorInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ActorBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
`;
const ActorImg = styled.div`
  width: 100px;
  height: 100px;
  background-position: center center;
  background-size: cover;
  margin-bottom: 10px;
  border-radius: 15px;
`;

const ActorName = styled.span`
  margin-top: 5px;
  opacity: 0.6;
`;
interface IGenre {
  name: string;
}

interface IPath {
  path?: any;
}

interface DetailProps {
  backdrop_path: string;
  genres: IGenre[];
  tagline: string;
  vote_average: number;
  release_date: string;
  title: string;
  overview: string;
  id: number;
}

interface ICast {
  character: string;
  name: string;
  id: number;
  profile_path: string;
}

interface CreditProps {
  cast: ICast[];
  id: number;
}

function MovieDetail({ path }: IPath) {
  //const location = useLocation();
  const { data: movies, isLoading } = useQuery<DetailProps>(
    ["movies", "detail"],
    async () =>
      await fetch(
        `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
      ).then((response) => response.json())
  );

  const { data: credit } = useQuery<CreditProps>(
    ["movies", "credit"],
    async () =>
      await fetch(
        `${BASE_PATH}/movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`
      ).then((response) => response.json())
  );

  const navigate = useNavigate();
  const clickedMovieMatch = useMatch(`${path}/:movieId`);
  const movieId = clickedMovieMatch?.params.movieId;
  console.log(credit);
  /*const SelectMov =clickedMovieMatch?.params.movieId
    clickedMovieMatch?.params.movieId &&
    data?.find(
      (movie) => String(movie.id) === clickedMovieMatch?.params.movieId
    );
find() 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환합니다.그런 요소가 없다면 undefined를 반환합니다.
    */

  const onOverpageClicked = () => {
    navigate(`/`);

    /*   if (location.pathname.slice(0, 7) === "/search") {
      navigate(`/search`);
    }*/
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
                  {movies && (
                    <>
                      <SelectMovImg
                        style={{
                          backgroundImage: `linear-gradient(transparent, rgb(24,24,24)) ,url(${makeImagePath(
                            movies?.backdrop_path
                          )})`,
                        }}
                      />
                      <SelectMovDetail>
                        <SelectMovTitle>
                          <SelectMovGenre>
                            {movies.genres.map((genre, index) => (
                              <SelectMovGenreBox key={index}>
                                <span>{genre.name}</span>
                              </SelectMovGenreBox>
                            ))}
                          </SelectMovGenre>
                          <div style={{ display: "flex" }}>
                            <h1>{movies.title}</h1>
                            <span> {movies.release_date.slice(0, 4)}</span>
                          </div>
                        </SelectMovTitle>
                        <SelectMovSub>
                          <span>{movies.tagline}</span>
                          <span>⭐{movies.vote_average?.toFixed(1)}</span>
                        </SelectMovSub>
                        <OverviwTitle>줄거리</OverviwTitle>
                        <SelectMovSum>{movies.overview}</SelectMovSum>
                        <ActorTitle>출연진</ActorTitle>
                        <ActorInfo>
                          {credit?.cast.slice(0, 6).map((act, index) => (
                            <ActorBox>
                              <ActorImg
                                style={{
                                  backgroundImage: `url(${makeImagePath(
                                    act?.profile_path
                                  )})`,
                                }}
                              ></ActorImg>
                              <h1>{act.name}</h1>
                              <ActorName>{act.character}</ActorName>
                            </ActorBox>
                          ))}
                        </ActorInfo>
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

export default React.memo(MovieDetail);
