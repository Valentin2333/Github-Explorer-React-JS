import React, { createContext, useState } from "react";

export const ErrorContext = createContext();

export default function ErrorContextProvider({ children }) {
  const [error, setError] = useState(null);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(true);

  return (
    <ErrorContext.Provider
      value={{ error, setError, isLoadMoreVisible, setIsLoadMoreVisible }}
    >
      {children}
    </ErrorContext.Provider>
  );
}
