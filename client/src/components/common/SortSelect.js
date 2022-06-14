import styled from "styled-components";
import { useContext } from "react";

// import context
import { SimpleContext } from "../SimpleContext";

const SortSelect = () => {
  // import context states
  const {
    airbnbResults,
    hotelsResults,
    selectedAirbnb,
    setSelectedAirbnb,
    selectedHotel,
    setSelectedHotel,
  } = useContext(SimpleContext);

  return (
    hotelsResults && (
      <Wrapper>
        <Label htmlFor="sort">Results:</Label>
        <select
          onChange={(event) => {
            console.log(event.target.value);
            setSelectedHotel(event.target.value);
          }}
          name="sort"
          id="sort"
        >
          <option value="sort">Sort by:</option>
          {/* Map over the flights id and render options */}
          {hotelsResults.map((hotel) => {
            // we set this 'value' to the state in onChange event with target.value()
            return (
              <option key={hotel.geoId} value={hotel}>
                {hotel}
              </option>
            );
          })}
        </select>
      </Wrapper>
    )
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
  padding: 0 0 0 20px;
`;
const Label = styled.label`
  padding-right: 15px;
`;

export default SortSelect;
