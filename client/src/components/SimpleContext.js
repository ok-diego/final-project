import { createContext, useState } from "react";

export const SimpleContext = createContext(null);

export const SimpleProvider = ({ children }) => {
  const [state, setStae] = useState([]);

  return (
    <SimpleContext.Provider
      value={{
        state,
        setStae,
      }}
    >
      {children}
    </SimpleContext.Provider>
  );
};
