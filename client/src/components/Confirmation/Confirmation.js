import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { SimpleContext } from "../SimpleContext";

const Confirmation = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);

  const { profileData, setProfileData } = useContext(SimpleContext);

  // fetch handle 'profile' data
  //   useEffect(() => {
  //     // adding profileId will fetch each user's api profile data
  //     fetch(`/api/profile/${user.email}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         // we set our fetched data to the 'profile' state!
  //         setProfileData(data.profile);
  //       })
  //       .catch((error) => {
  //         console.log(`Error in Profile: ${error}`);
  //       });
  //   }, []);

  //   console.log(profileData);

  return (
    <Wrapper>
      <TextDiv>Your reservation has been placed!</TextDiv>
      <TextDiv>
        <LinkProfile to="/profile/">See reservation details</LinkProfile>
      </TextDiv>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20vh;
`;
const TextDiv = styled.div`
  color: black;
  padding: 20px 0;
  font-weight: 400;
  font-size: 18px;
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

const Button = styled.button`
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

export default Confirmation;
