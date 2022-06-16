import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import NullMap from "../Map";
import Hero from "../Hero";
import { useContext } from "react";
import { SimpleContext } from "../SimpleContext";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log(user.sub);

  const { airbnbResults, hotelsResults, profileData, setProfileData } =
    useContext(SimpleContext);

  const userIdLocStorage = (id) => {
    localStorage.setItem("userId", id);
  };

  if (isAuthenticated) {
    // setProfileData(user);
    userIdLocStorage(user.sub);
    // console.log(user);
  }

  return (
    <Wrapper>
      {!hotelsResults && !airbnbResults && <Hero />}
      {hotelsResults && airbnbResults && <NullMap />}
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
