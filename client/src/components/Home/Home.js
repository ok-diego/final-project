import styled from "styled-components";
import Planning from "../Planning";
import NullMap from "../Map";
import Hero from "../Hero";
import { useContext } from "react";
import { SimpleContext } from "../SimpleContext";

const Home = () => {
  const { airbnbResults, hotelsResults } = useContext(SimpleContext);

  return (
    <Wrapper>
      {!hotelsResults && <Hero />}
      {hotelsResults && <NullMap />}
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
