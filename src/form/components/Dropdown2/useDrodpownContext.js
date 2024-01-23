import { createContext, useContext } from 'react';

export const DropdownContext = createContext();

function useDropdowContext() {
  return useContext(DropdownContext);
}

export default useDropdowContext;
