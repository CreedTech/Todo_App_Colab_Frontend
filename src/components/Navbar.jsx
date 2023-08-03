/* eslint-disable react/prop-types */
import { useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import Cookies from 'universal-cookie';
import { logout } from '../redux/slice/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

// import logo from '../../images/logo.png';

const url = 'https://todo-app-backend-n4ta.onrender.com/api/users/logout';

const Navbar = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  // const [toggleMenu, setToggleMenu] = useState(false);
  const cookies = new Cookies();
  const item = localStorage.getItem('todo_user');
  // const person = JSON.parse(item);
  // console.log(person.payload.email);
  // const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    const headers = { 'Content-Type': 'application/json' };
    // setLoading(true);
    try {
      const data = await axios({
        method: 'GET',
        url,
        headers,
      });

      // setLoading(false);
      console.log(data.data.message);
      // setLoading(false);
      dispatch(logout());
      cookies.remove('userId');
      navigate('/');
      toast.success(`${data.data.message} 🚀. Bye.`);
    } catch (error) {
      // setLoading(false);
      // setError(error.response.data.message);
      console.log(error);
      toast.error(error.data.message);
    }
  };

  return (
    <nav className="flex items-center justify-between w-full p-4 md:justify-center">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        {/* <img src={ logo} alt={logo} className='w-32 cursor-pointer' /> */}
        <Link to="/">
          <h1 className="text-white">T&L TODO</h1>
        </Link>
      </div>
      <ul className="flex-row items-center justify-between flex-initial hidden text-white list-none md:flex">
        {/* <h1>Welcome {person && person.payload.email.split("@")[0]}</h1> */}
        {!isLoggedIn ? (
          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
            {' '}
            <Link to="/signup">Sign up</Link>
          </li>
        ) : (
          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
            {' '}
            <button onClick={() => handleLogOut()}>Logout</button>
          </li>
        )}
        {!isLoggedIn ? (
          <li className="bg-[#ffffff] py-2 px-7 mx-4 rounded-full cursor-pointer text-black hover:bg-[#ffffff]">
            <Link to="/login">Login</Link>
          </li>
        ) : null}
      </ul>
      <div className="relative flex">
        {toggleMenu ? (
          <></>
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white cursor-pointer md:hidden"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
          flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in
            "
          >
            <li className="w-full my-2 text-xl">
              <AiOutlineClose
                className="cursor-pointer text-hite"
                onClick={() => {
                  setToggleMenu(false);
                }}
              />
            </li>

            {!isLoggedIn ? (
              <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                {' '}
                <Link to="/signup">Sign up</Link>
              </li>
            ) : (
              <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                {' '}
                <button onClick={() => handleLogOut()}>Logout</button>
              </li>
            )}
            {!isLoggedIn ? (
              <li className="bg-[#ffffff] py-2 px-7 mx-4 rounded-full cursor-pointer text-black hover:bg-[#ffffff]">
                <Link to="/login">Login</Link>
              </li>
            ) : null}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
