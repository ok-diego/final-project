import styled from "styled-components";

const Planning = () => {
  return (
    <Wrapper>
      <Div>Create your itineray from the best hotels and airbnbs available</Div>
      <Button>Start planing!</Button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 30vw;
  padding-top: 40px;
`;
const Div = styled.div`
  padding: 20px 0;
  font-weight: 400;
`;
const Button = styled.button`
  text-decoration: none;
  color: white;
  margin-top: 0;
  font-weight: 400;
  padding: 10px 35px;
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
export default Planning;
