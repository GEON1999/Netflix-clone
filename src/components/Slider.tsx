import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMovie } from "../api";
import { makeImagePath, useWindowDimensions } from "../utils";

const Container = styled(motion.div)`
  position: relative;
  bottom: 150px;
  width: 100%;
  &:nth-child(1) {
    margin-top: 100px;
  }
  &:nth-child(2) {
    margin-top: 700px;
  }
`;

const SliderTitle = styled.div`
  font-size: 30px;
  font-weight: 800;
  padding: 20px 100px;
`;

const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 99vw;
  padding: 0px 100px;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 600px;
  font-size: 10px;
  border-radius: 8px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const BoxImg = styled(motion.div)<{ bg: string }>`
  background-image: url(${(prop) => prop.bg});
  height: 600px;
  background-size: cover;
  background-position: center center;
`;

const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.darker};
  padding: 15px 0px;
  bottom: 0;
  width: 100%;
  opacity: 0;
  h4 {
    margin-left: 22px;
    color: white;
    font-size: 16px;
  }
`;

const BtnBox = styled(motion.div)`
  background-color: transparent;
  height: 600px;
  width: 50px;
  left: 0;
  display: flex;
  justify-content: cneter;
  align-items: center;
  position: absolute;
  left: 96%;
  cursor: pointer;
  transition: ease-in-out 0.5s;
  z-index: 3;
  &:hover {
    background-color: rgb(32, 32, 32);
    opacity: 0.8;
    svg {
      fill: rgb(138, 138, 138);
      transform: scale(1.3);
    }
  }
`;

const Svg = styled(motion.svg)`
  height: 30px;
  width: 30px;
  fill: rgb(128, 128, 128);
  transition: ease-in-out 0.5s;
  margin-left: 5px;
`;

const Infotitle = styled.div``;

const InfoSub = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
  padding: 0px 10px;
  span {
    margin: 0px 10px;
  }
`;

const boxVariant = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
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

interface SliderProps {
  data: IMovie[];
  title: string;
  path?: string;
  id?: string;
}

const offset = 6;

function Slider({ data, title, path, id }: SliderProps) {
  const navigate = useNavigate();
  const width = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const maxLength = data.length;
      const maxSliderLength = Math.floor(maxLength / offset) - 1;
      setIndex((prev) => (prev === maxSliderLength ? 0 : prev + 1));
    }
  };
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  return (
    <Container>
      <SliderTitle>{title}</SliderTitle>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          //variants={rowVariant}
          initial={{ x: width + 10 }}
          animate={{ x: 0 }}
          exit={{ x: -width - 10 }}
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {data
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <Box
                layoutId={id ? id + movie.id : movie.id + ""}
                onClick={() => onBoxClicked(movie.id)}
                key={movie.id}
                variants={boxVariant}
                whileHover="hover"
                initial="normal"
                transition={{ type: "tween" }}
              >
                <BoxImg bg={makeImagePath(movie.poster_path, "w500")}></BoxImg>
                <Info variants={infoVariant}>
                  <Infotitle>
                    <h4>{movie.title}</h4>
                  </Infotitle>
                  <InfoSub>
                    <span>⭐{movie.vote_average?.toFixed(1)}</span>
                    <span>개봉일 : {movie.release_date}</span>
                  </InfoSub>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
      <AnimatePresence>
        <BtnBox onClick={incraseIndex}>
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
          </Svg>
        </BtnBox>
      </AnimatePresence>
    </Container>
  );
}

export default Slider;
