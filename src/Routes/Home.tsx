import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMovieResult, popularMovies } from "../api";
import MovieDetail from "../components/MovieDetail";
import Slider from "../components/Slider";
import { makeImagePath } from "../utils";

const Wrapper = styled.div``;

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
  font-size: 20px;
  width: 40%;
`;

const Detail = styled.button`
  background-color: white;
  border-radius: 5px;
  width: 150px;
  padding: 10px;
  margin: 30px 0px;
  color: ${(prop) => prop.theme.black.darker};
  text-align: center;
  font-size: 15px;
  font-weight: 800;
  border: none;
`;

const Loader = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 800;
`;

function Home() {
  const { data: nowPlaying, isLoading } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const { data: popular } = useQuery<IGetMovieResult>(
    ["movies", "popular"],
    popularMovies
  );
  const navigate = useNavigate();
  const onBoxClicked = () => {
    navigate(`/movies/${nowPlaying?.results[0].id}`);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bg={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
          >
            <Title>{nowPlaying?.results[0].title}</Title>
            <Overview>{nowPlaying?.results[0].overview}</Overview>
            <Detail onClick={onBoxClicked}>자세히 보기</Detail>
          </Banner>

          <Slider data={nowPlaying?.results ?? []} title="극장 상영 영화" />
          <Slider data={popular?.results ?? []} title="최고의 영화" />
        </>
      )}
      <MovieDetail />
    </Wrapper>
  );
}

export default Home;
