import { useContext, useState } from "react";
import styled from "styled-components";
import { SimpleContext } from "../SimpleContext";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Planning = () => {
  const { destination, setDestination, date, setDate } =
    useContext(SimpleContext);
  const [userInput, setUserInput] = useState("");

  //   date picker states
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  console.log(startDate);
  console.log(endDate);

  const handleSubmit = (event) => {
    event.preventDefault();

    // we have a local state to keep track of the user input
    // this state is always going to be one step behind because that's how they work
    // we use the state in context becuase it's updated and we have acess to the latest

    setDestination(userInput);

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
        // we hide our API key in the .env file (environment variables)
        "X-RapidAPI-Key": `${process.env.REACT_APP_AIRBNB_KEY}`,
      },
    };

    fetch(
      `https://airbnb13.p.rapidapi.com/search-location?location=${destination}&checkin=2022-05-16&checkout=2022-05-17&adults=1&children=0&infants=0&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  //   console.log(destination);

  return (
    <Wrapper>
      <Div>Create your itineray from the best hotels and airbnbs available</Div>
      {/* <Button>Start planing!</Button> */}
      <Form onSubmit={handleSubmit}>
        <Fieldset>
          <InputText
            type="text"
            value={userInput}
            name="destination"
            placeholder="Enter destination"
            onChange={(event) => {
              setUserInput(event.target.value);
              console.log(userInput);
            }}
          />
          <DateDiv>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start date:"
                views={["year", "month", "day"]}
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End date:"
                views={["year", "month", "day"]}
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </DateDiv>
          <InputSubmit type="submit" value="See your destinations" />
        </Fieldset>
      </Form>
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
  font-weight: 600;
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
const Form = styled.form``;

const InputText = styled.input`
  width: 40%;
  /* height: 40px; */
  border: 1px solid #c4c4c4;
  border-radius: 3px;
  padding: 18px;
  margin: 5px 0;

  &:focus {
    background-color: none;
  }

  &:hover {
    border: 1px solid black;
  }

  &:visited {
    background: none;
  }

  &::placeholder {
  }
`;

const InputSubmit = styled.input`
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
  width: 100%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }
`;

const Fieldset = styled.fieldset``;

const DateDiv = styled.div`
  display: flex;
  padding: 10px 0;
`;

export default Planning;
