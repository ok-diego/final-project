import styled from "styled-components";

import heroImage from "../../assets/nice-fr-1600x500.jpg";
import Planning from "../Planning";

const Hero = () => {
  return (
    <Wrapper>
      <HeroContent>
        <H1>Welcome to Simple Stay</H1>
        {/* <H2>Welcome to Simple Stay</H2> */}
        <Planning />
      </HeroContent>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  min-height: calc(100vh - 180px);
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: calc(100vh - 180px);
    background: url(${heroImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    filter: brightness(60%);
  }
`;
const HeroContent = styled.div`
  position: relative;
  color: white;
  text-align: center;
  margin: 0.625rem;
`;
const H1 = styled.h1`
  color: white;
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 0;
`;
const H2 = styled.h2`
  color: white;
  font-size: 2rem;
  font-weight: 200;
  margin-top: 1rem;
`;

export default Hero;
