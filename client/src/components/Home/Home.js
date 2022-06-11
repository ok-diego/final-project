import styled from "styled-components";
import Profile from "../Profile";
import Planning from "../Planning";
import NullMap from "../Map";
import Hero from "../Hero";
import { useContext } from "react";
import { SimpleContext } from "../SimpleContext";

const Home = () => {
  const { destination } = useContext(SimpleContext);

  return (
    <Wrapper>
      <Hero />
      <Profile />
      {destination && <NullMap />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export default Home;
