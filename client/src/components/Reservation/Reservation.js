import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Reservation = () => {
  // setting the type and reservation id to the info(in Map file) we passed in each LinkCard
  // to the url when we click on them - see line 232 onwwards
  const { type, reservationId } = useParams();
  console.log(type, reservationId);

  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);

  const navigate = useNavigate();

  const handleNavigateToConfirmation = () => {
    navigate.push("/confirmation");
  };

  const handleSubmitReservation = (ev) => {
    ev.preventDefault();

    // declare request body object
    const requestBody = {
      email: user.email,
      // push the type and reservation id in the user reservation array in mongodb
      reservation: { type, reservationId },
    };

    console.log({ requestBody });

    // set POST request to BE
    // const requestObj = {
    //   method: "POST",
    //   body: JSON.stringify({}),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    // fetch("/user-reservation", requestObj)
    //   .then((res) => res.json())
    //   .then((parsedResponse) => console.log(parsedResponse))
    //   .catch((err) => console.log(err));

    // set POST request to BE
    try {
      fetch("/user-reservation", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then((parsedResponse) => {
          console.log("Hi", parsedResponse);

          if (parsedResponse.status === 201) {
            handleNavigateToConfirmation();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <TextDiv>Reservation</TextDiv>
      <Button
        onClick={(ev) => {
          handleSubmitReservation(ev);
        }}
      >
        Confirm
      </Button>
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
const Button = styled.button`
  align-self: center;
  text-decoration: none;
  color: white;
  margin-top: 0;
  font-weight: 400;
  padding: 10px 30px;
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

export default Reservation;
