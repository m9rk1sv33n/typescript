import { useEffect, useState } from "react";

const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    //the code that we want to run
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    //optional return (cleanup) function
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]); //the dependency array

  return debouncedValue;
};

export default useDebounce;
