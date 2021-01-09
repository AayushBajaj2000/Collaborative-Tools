import React, { createContext, useContext, useReducer } from "react";

//The data layer
export const StateContext = createContext();

//Build a provider to wrap the app to give acces to the data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);