import React from "react";
import { getGlobal } from "../api";
import { useApi } from "../hooks/useApi";
import { GlobalContext } from "./globalContext";

/**
 * Fetches the site-wide settings once so the header and footer share a single
 * request instead of fetching the same single type twice.
 */
const GlobalProvider = ({ children }) => {
  const { data, loading, error } = useApi((options) => getGlobal(options), []);

  return (
    <GlobalContext.Provider value={{ global: data, loading, error }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
