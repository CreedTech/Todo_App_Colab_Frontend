/* eslint-disable react/prop-types */
import  {useState} from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";

// import logo from '../../images/logo.png';


const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
              {/* <img src={ logo} alt={logo} className='w-32 cursor-pointer' /> */}
              <h1 className='text-white'>T&L TODO</h1>
      </div>
      <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
        
        <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'> <Link to="/signup">Sign up</Link></li>
        <li className='bg-[#ffffff] py-2 px-7 mx-4 rounded-full cursor-pointer text-black hover:bg-[#ffffff]'>Login</li>
      </ul>
      <div className='flex relative'>
        {toggleMenu
          ? <></>
          : <HiMenuAlt4 fontSize={28} className='text-black md:hidden cursor-pointer' onClick={() => setToggleMenu(true)}/>
        }
        {toggleMenu && (
          <ul
            className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
          flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in
            '
          >
            <li className='text-xl w-full my-2'>
              <AiOutlineClose className='cursor-pointer text-black' onClick={() => { setToggleMenu(false) }} />
            </li>
            
                       <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>Sign up</li>
        <li className='bg-[#ffffff] py-2 px-7 mx-4 rounded-full cursor-pointer text-black hover:bg-[#ffffff]'>Login</li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar