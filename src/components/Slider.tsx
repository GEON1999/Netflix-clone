import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMovie } from "../api";
import { makeImagePath, useWindowDimensions } from "../utils";

const Container = styled(motion.div)`
  position: relative;
  height: 30vh;
  width: 100vw;
`;

const SliderTitle = styled.div`
  font-size: 30px;
  padding: 20px 50px;
`;

const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  padding: 0px 50px;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
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
  height: 200px;
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

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

interface SliderProps {
  data: IMovie[];
  title?: string;
}

const offset = 6;

function Slider({ data, title }: SliderProps) {
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
      <SliderTitle onClick={incraseIndex}>{title}</SliderTitle>
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
                layoutId={movie.id + ""}
                onClick={() => onBoxClicked(movie.id)}
                key={movie.id}
                variants={boxVariant}
                whileHover="hover"
                initial="normal"
                transition={{ type: "tween" }}
              >
                <BoxImg bg={makeImagePath(movie.poster_path, "w500")}></BoxImg>
                <Info variants={infoVariant}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
    </Container>
  );
}

export default Slider;
