import React, { createContext, useReducer, useContext } from "react";



export const AppContext = createContext();

export const AppProvider = ({ children, initialState, reducer }) => {
<AppContext.Provider value={useReducer(reducer, initialState)}>
  {children}
</AppContext.Provider>
};

export const useAppContext = () => useContext(AppContext)