import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated) {
    console.log(user);
    // request backend to verify if user exist in mongoDB
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Wrapper>
        {/* <img src={user.picture} alt={user.name} /> */}
        <h3>Hello {user.name}!</h3>
        <Email>{user.email}</Email>
      </Wrapper>
    )
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 20vh;
`;
const Email = styled.div`
  padding-top: 20px;
`;

export default Profile;
