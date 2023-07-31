import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home, Signup } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Suspense, useEffect } from 'react';
import Fallback from './components/Fallback';
import { useAppDispatch, useAppSelector } from './hooks';
import { getUserTodos, login } from './redux/slice/userSlice';
import Cookies from 'universal-cookie';

function App() {
  const { isLoggedIn } = useAppSelector((store) => store.user);
  const cookies = new Cookies();
  const userId = cookies.get('userId');
  const dispatch = useAppDispatch();

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
    dispatch(getUserTodos(userId));
    // dispatch(getSubscribedApis(userId));
  }, [isLoggedIn === true, userId]);
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900">
        <ToastContainer />
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>

        {/* <Navbar />
      <Main/> */}
        {/* <Services />
    <Transactions />
    <Footer /> */}
      </div>
    </>
  );
}

export default App;
