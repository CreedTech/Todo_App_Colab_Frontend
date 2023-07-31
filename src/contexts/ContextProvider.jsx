import  { createContext, useState } from 'react';

const AppContext = createContext(null);

const initialState = { login: false, addapi: false };

// ContextProvider.propTypes = {
//   children: React.ReactNode,
// };
// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const [isClicked, setIsClicked] = useState(initialState);

  const [trigger, setTrigger] = useState(false);

  const handleClicked = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  const handleUnclicked = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: false });
  };

  const triggerRefresh = () => setTrigger((prev) => !prev);

  const values = {
    isLoggedIn,
    setisLoggedIn,
    isClicked,
    handleClicked,
    handleUnclicked,
    trigger,
    triggerRefresh,
  };

  return (
    <AppContext.Provider value={values}>{children}</AppContext.Provider>
  );
};

// export const useContextProvider = () => useContext(AppContext);
