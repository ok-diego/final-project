import styled from "styled-components";
import Profile from "../Profile";
import Planning from "../Planning/Planning";

const Home = () => {
  return (
    <Wrapper>
      <Profile />
      <Planning />
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
