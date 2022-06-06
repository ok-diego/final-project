import styled from "styled-components";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Wrapper>
      <>
        <Err>Oops! This is not what you are looking for.</Err>
        <StyledLink to="/">Return to Homepage</StyledLink>
      </>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-top: 25px;
  font-weight: 300;
  padding: 15px 50px;
  font-size: 1em;
  transition: background-color 0.2s ease-out 20ms;
  transition: all 0.2s ease-in-out;
  background-color: black;
  border: none;
  border-radius: 30px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }
`;
const Err = styled.div`
  margin-top: 50px;
  font-size: 1.2em;
  font-weight: 400;
`;

export default Error;
