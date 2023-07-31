
import { useContext } from 'react';
import { AppContext } from './AppContext'; // Make sure to import the AppContext from the correct location

export const useContextProvider = () => useContext(AppContext);
