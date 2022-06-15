import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { SimpleContext } from "../SimpleContext";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const { userReservations, setUserReservations } = useContext(SimpleContext);

  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    if (!user) {
      setUserReservations([]);
      // useNavigate to heme if user not logged in
      handleNavigateHome();
    } else {
      fetch(`/user-reservations/${user.email}`)
        .then((res) => res.json())
        .then((parsedResponse) => {
          // console.log(parsedResponse.data);
          setUserReservations(parsedResponse.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  if (isAuthenticated) {
    // console.log(user);
    // request backend to verify if user exist in mongoDB
  }
  // console.log(userReservations);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated &&
    userReservations && (
      <Wrapper>
        <User>
          <TextProfile>Pofile</TextProfile>
          User: {user.nickname}
          <Email>Email: {user.email}</Email>
        </User>
        <TextRes>Manage you reservations</TextRes>
        {userReservations.map((reservation) => {
          return (
            <>
              <DetailsDiv>
                <TextName>{reservation.name}</TextName>
                <TextAddress>
                  <SpanBold></SpanBold> {reservation.address}
                </TextAddress>
                <TextType>
                  <SpanBold>Type:</SpanBold> {reservation.type}
                </TextType>
                <TextBedroom>
                  <SpanBold>Bedrooms:</SpanBold>{" "}
                  <SpanNumber>{reservation.bedrooms}</SpanNumber>
                  <LinkDelete to="/">Delete</LinkDelete>
                </TextBedroom>
              </DetailsDiv>
            </>
          );
        })}
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
  margin-top: 10vh;
`;
const TextProfile = styled.div`
  align-self: center;
  color: var(--color-primary);
  font-weight: 600;
  padding: 0 0 10px 0;
  width: 400px;
`;
const User = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;
const Email = styled.div`
  padding-top: 10px;
`;
const DetailsDiv = styled.div`
  position: relative;
  align-items: flex-start;
  color: var(--color-primary);
  text-decoration: none;
  border-radius: 15px;
  padding: 5px 0;
  width: 400px;
`;
const TextRes = styled.div`
  align-self: center;
  color: var(--color-primary);
  font-weight: 600;
  padding: 50px 0 0 0;
  width: 400px;
`;
const TextName = styled.div`
  align-self: flex-start;
  color: var(--color-primary);
  font-weight: 400;
  padding: 10px 0 0 0;
`;
const TextAddress = styled.div`
  color: var(--color-dark-green);
  padding: 10px 0 5px 0;
`;
const TextType = styled.div`
  color: black;
  padding: 5px 0;
`;
const TextBedroom = styled.div`
  display: flex;
  color: black;
  padding: 5px 0;
`;
const SpanBold = styled.span`
  font-weight: 600;
`;
const SpanNumber = styled.span`
  padding: 0 0 0 5px;
`;
const LinkDelete = styled(Link)`
  /* position: absolute;
  bottom: 0;
  left: 200px;
  width: 400px; */
  color: var(--color-primary);
  text-decoration: none;
  border-radius: 5px;
  align-self: flex-end;
  margin: 0 0 0 200px;
  padding: 4px 5px;
  background-color: var(--color-light-green);
  font-size: 0.9rem;

  &:hover {
    color: rgba(0, 0, 0, 0.8);
    box-shadow: 0 2px 3px 0 rgba(160, 174, 217, 0.16),
      0 2px 8px 0 rgba(160, 174, 217, 0.12);
  }
`;

export default Profile;
