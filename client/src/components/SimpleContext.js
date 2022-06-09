import { createContext, useState } from "react";

export const SimpleContext = createContext(null);

export const SimpleProvider = ({ children }) => {
  const [state, setStae] = useState([]);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState("");
  const [hotelsResutls, setHotelsResults] = useState("");

  return (
    <SimpleContext.Provider
      value={{
        state,
        setStae,
        destination,
        setDestination,
        date,
        setDate,
        results,
        setResults,
        hotelsResutls,
        setHotelsResults,
      }}
    >
      {children}
    </SimpleContext.Provider>
  );
};
