import { createContext, useState } from "react";

export const SimpleContext = createContext(null);

export const SimpleProvider = ({ children }) => {
  const [state, setStae] = useState([]);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [airbnbResults, setAirbnbResults] = useState("");
  const [hotelsResults, setHotelsResults] = useState("");
  const [selectedAirbnb, setSelectedAirbnb] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <SimpleContext.Provider
      value={{
        state,
        setStae,
        destination,
        setDestination,
        date,
        setDate,
        airbnbResults,
        setAirbnbResults,
        hotelsResults,
        setHotelsResults,
        selectedAirbnb,
        setSelectedAirbnb,
        selectedHotel,
        setSelectedHotel,
      }}
    >
      {children}
    </SimpleContext.Provider>
  );
};
