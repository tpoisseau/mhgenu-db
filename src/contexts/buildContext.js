import React, {createContext, useContext, useReducer} from 'react';

export default function buildContext(initialState = {}, reducer) {
  const StateContext = createContext(initialState);
  
  const StateProvider = ({children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
  
  const useStateValue = () => useContext(StateContext);
  
  return {
    StateContext,
    StateProvider,
    useStateValue,
  }
}