import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Signup } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Suspense, useEffect } from 'react';
import Fallback from './components/Fallback';
import { useAppDispatch } from './hooks';
import {  login } from './redux/slice/userSlice';
import Cookies from 'universal-cookie';
import { AddTodoPopup, Navbar } from './components';
import { useContextProvider } from './contexts/ContextProvider';
import UpdateTodoPopup from './components/UpdateTodoPopup';

function App() {
  // const { isLoggedIn } = useAppSelector((store) => store.user);
  const cookies = new Cookies();
  const userId = cookies.get('userId');
  const dispatch = useAppDispatch();
  const { isClicked } = useContextProvider();

  useEffect(() => {
    const loginUser = () => {
      const item = localStorage.getItem('todo_user');
      if (!item) return;
      const user = JSON.parse(item);
      dispatch(login(user));
    };
    loginUser();
  }, []);

  useEffect(() => {
    if (userId === undefined) return;
  }, [userId]);
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900">
        <ToastContainer />
        <Suspense fallback={<Fallback />}>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>

        {/* <Navbar />
      <Main/> */}
        {/* <Services />
    <Transactions />
    <Footer /> */}
        {isClicked.addtodo && <AddTodoPopup />}
        {isClicked.updatetodo && <UpdateTodoPopup />}
      </div>
    </>
  );
}

export default App;
