import styled from "styled-components";
import { Link } from "react-router-dom";
import heroImage from "../../assets/nice-fr-2-1600x900.jpg";

const Hero = () => {
  return (
    <Wrapper>
      <HeroContent>
        <TextDiv>Your reservation has been placed!</TextDiv>
        <TextDiv>
          <LinkProfile to="/profile">See reservation details</LinkProfile>
        </TextDiv>
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
  z-index: 0;

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
  margin: 1rem;
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
const TextDiv = styled.div`
  color: white;
  padding: 20px 0;
  font-weight: 400;
  font-size: 1.3rem;
`;
const LinkProfile = styled(Link)`
  text-decoration: none;
  color: white;
  margin-top: 0;
  font-weight: 400;
  padding: 10px 25px;
  margin-left: 5px;
  font-size: 0.9rem;
  background-color: var(--color-primary);
  border: none;
  border-radius: 30px;
  transition: background-color 0.2s ease-out 20ms;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }
`;

export default Hero;
