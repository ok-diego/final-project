import styled from "styled-components";
import LoginButton from "../common/LoginButton";
import LogoutButton from "../common/LogoutButton";
import Profile from "../Profile";

const Home = () => {
  return (
    <Wrapper>
      <Profile />
      <LoginButton />
      <LogoutButton />
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default Home;
