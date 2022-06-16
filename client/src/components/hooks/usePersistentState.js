import { useState, useEffect } from "react";

// we create our own hook so we can re-use it
// we pass the initial state name and value so we can pass it to state and setState
const usePersistentState = (id, defaultValue) => {
  // we set an initial states
  const [state, setState] = useState(() => {
    // we get the state name that we set in line 19 below
    const storedId = window.localStorage.getItem(id);
    // convert string back to object
    // if there is nothing in stored name (key) return the object or return the defautlt value(1000)
    return storedId !== null ? JSON.parse(storedId) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(id, JSON.stringify(state));

    // our callback function will run when state updates
  }, [state]);

  return [state, setState];
};

export default usePersistentState;
