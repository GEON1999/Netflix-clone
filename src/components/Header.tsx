import styled from "styled-components";
import {
  motion,
  AnimatePresence,
  useViewportScroll,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;

  font-size: 14px;
  padding: 20px 0px;
  color: white;
`;

const Col = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  margin-left: 60px;
  /*  path {
    stroke-width: 6px;
    stroke: white;
  }*/
`;

const Items = styled(motion.ul)`
  display: flex;
  align-items: center;
  margin-right: 60px;
`;

const Item = styled(motion.li)`
  margin-right: 20px;
  color: ${(props) => props.theme.white.lighter};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.darker};
  }
`;

const OverPage = styled(motion.div)`
  position: absolute;
  width: 100vw;
  height: 200vh;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1;
`;
const Search = styled.span`
  color: white;
  margin-right: 60px;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  width: 40%;
  height: 38px;
  z-index: 100;
  background-color: rgb(3, 3, 3);
  border: none;
  color: white;
  font-size: 18px;
  margin-bottom: 5px;
  border-radius: 20px;
  padding: 5px;
  box-shadow: 3px 3px 3px rgb(66, 66, 66);
  text-align: center;
  :focus {
    outline: none;
  }
  ::placeholder {
    text-align: center;
  }
`;

const Container = styled(motion.div)`
  position: absolute;
  width: 100vw;
`;

const Form = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Header() {
  const [search, setSearch] = useState(false);
  const scroll = useViewportScroll().scrollY;
  const gradient = useTransform(
    scroll,
    [0, 150],
    [
      "linear-gradient(rgba(78, 78, 78, 0.8), rgba(255, 255, 255, 0.4))",
      "linear-gradient(rgb(0, 0, 0), rgb(7, 7, 7))",
    ]
  );
  return (
    <Nav style={{ background: gradient }}>
      <Col
        animate={search ? { opacity: 0, x: -200 } : { opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        <Items
          animate={search ? { opacity: 0, x: -200 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link to={"/"}>
            {" "}
            <Item>Home</Item>
          </Link>
          <Link to="/Tv">
            {" "}
            <Item>Tv Shows</Item>
          </Link>
        </Items>
      </Col>
      <Col
        animate={search ? { opacity: 0, x: -200 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Search>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setSearch(true)}
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Search>
      </Col>

      <AnimatePresence>
        {search ? (
          <Container>
            <Form>
              <Input
                placeholder="Netflix Search"
                initial={{ opacity: 0, x: 400 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </Form>

            <OverPage
              initial={{ backgroundColor: "rgba(1,1,1,0)" }}
              animate={{ backgroundColor: "rgba(1,1,1,0.5)" }}
              exit={{ backgroundColor: "rgba(1,1,1,0)" }}
              onClick={() => setSearch(false)}
            ></OverPage>
          </Container>
        ) : null}
      </AnimatePresence>
    </Nav>
  );
}

export default Header;
