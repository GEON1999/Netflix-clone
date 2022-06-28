import { motion } from "framer-motion";
import { useQuery } from "react-query";
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
  font-size: 22px;
  width: 45%;
`;

const Loader = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 800;
`;

const SiderContainer = styled.div`
  justify-content: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: -650px;
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
          </Banner>
          <SiderContainer>
            <Slider data={nowPlaying?.results ?? []} title="Now Playing" />
            <Slider data={popular?.results ?? []} title="Popular" />
          </SiderContainer>
        </>
      )}
      <MovieDetail />
    </Wrapper>
  );
}

export default Home;
