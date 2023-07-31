/* eslint-disable react/prop-types */
import { useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import Cookies from "universal-cookie";
import { logout } from '../redux/slice/userSlice';

// import logo from '../../images/logo.png';

const Navbar = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const cookies = new Cookies();
  
  const handleLogOut = () => {
    dispatch(logout());
    cookies.remove("userId");
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between w-full p-4 md:justify-center">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        {/* <img src={ logo} alt={logo} className='w-32 cursor-pointer' /> */}
        <h1 className="text-white">T&L TODO</h1>
      </div>
      <ul className="flex-row items-center justify-between flex-initial hidden text-white list-none md:flex">
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
            Login
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
            Login
          </li>
        ) : null}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
