import { createContext, useContext } from "react";

export const GlobalContext = createContext({
  global: null,
  loading: true,
  error: null,
});

/** Site-wide settings (logo, contact details, socials) from the CMS. */
export const useGlobal = () => useContext(GlobalContext);
