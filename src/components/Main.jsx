import { IoIosAddCircle } from 'react-icons/io';
import { LiaTrashSolid } from 'react-icons/lia';
import { LuEdit } from 'react-icons/lu';
import { useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import Modal from './Modal';
import { useContextProvider } from '../contexts/ContextProvider';
import { useEffect } from 'react';
// import {
//   getUserTodos,
// } from '../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Fallback from './Fallback';
import { getTodos } from '../redux/slice/todoSlice';

const Main = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { handleClicked, triggerRefresh } = useContextProvider();
  const dispatch = useDispatch();

  const { todos, isLoading, isError, message } = useSelector(
    (state) => state.todos
  );
  // const { userTodos ,isLoading, isError, message } = useSelector(
  //   (state) => state.user
  // );
  // const { triggerRefresh } = useContextProvider();

  // const todos = useSelector((state) => state.user.userTodos);
  console.log(todos);

  useEffect(() => {
    if (isError) {
      console.log('message');
      console.log(message);
    }

    dispatch(getTodos());
    // triggerRefresh();
    // return () => {
    //   dispatch(reset());
    // };
  }, [isError, message, dispatch, triggerRefresh]);




  if (isLoading) {
    return <Fallback />;
  }




  return (
    <div>
      {isLoggedIn ? (
        <>
         
          <div className="flex items-center justify-center h-[90vh] flex-col">
          <p className="text-xl font-semibold text-center text-white">
              Your To-do List
            </p>
            <button
              className="block px-10 py-4 my-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() => handleClicked('addtodo')}
            >
              Create A New Todo
            </button>
            {todos.userTodos.length > 0 ? (
              <>
                <div className="flex items-center justify-center">
                  <div className="h-auto p-4 bg-white rounded-lg md:w-[40rem] w-96">
                    <ul className="my-4">
                      {todos.userTodos.map((todo, index) => (
                        <h1 className="text-white" key={index}>
                          <li className="mt-4 " id={index}>
                            <div className="flex gap-2 md:flex-col mf:flex-row">
                              <div className="w-9/12 h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
                                <span className="text-black">{index + 1}.</span>
                                <div className="ml-4 text-sm font-semibold text-black">
                                  {todo.title}
                                </div>
                              </div>
                              <span onClick={() => handleClicked('updatetodo')} className="w-1/6 h-12 bg-[#00ff51] rounded-[7px] flex justify-center text-sm text-[#ffffff] font-semibold items-center ">
                                <LuEdit size={30} className="text-white" />
                              </span>
                              <span className="w-1/6 h-12 bg-[#ff0000] rounded-[7px] flex justify-center text-sm text-[#ffffff] font-semibold items-center ">
                                <LiaTrashSolid
                                  size={30}
                                  className="text-white"
                                />
                              </span>
                              
                            </div>
                          </li>
                        </h1>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <IoIosAddCircle
                    size={160}
                    className="fixed flex items-center justify-center text-blue-700 cursor-pointer bottom-4 right-4"
                    onClick={() => handleClicked('addtodo')}
                  />
                </div>
              </>
            ) : (
              // </div>
              // <div className="flex items-center justify-center h-[90vh] flex-col">
              <>
                <h1 className="text-white">No Todo History</h1>
                <div>
                  <IoIosAddCircle
                    size={160}
                    className="fixed flex items-center justify-center text-blue-700 cursor-pointer bottom-4 right-4"
                    onClick={() => handleClicked('addtodo')}
                  />
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center h-[90vh] flex-col">
            <h1 className="text-white">Login to See your todos</h1>

            <IoIosAddCircle
              size={160}
              className="text-blue-700 cursor-pointer"
              onClick={() => navigate('/login')}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Main;

// {list.length !== 0 ? (
//   <div className="flex items-center justify-center h-[90vh] flex-col">
//     <div className="flex items-center justify-center">
//       <div className="h-auto p-4 bg-white rounded-lg md:w-[40rem] w-96">
//         <p className="text-xl font-semibold mt-2 text-[#063c76] text-center">
//           Your To-do List
//         </p>

//         <ul className="my-4">
//           {list.map((todo, index) => (
//             <h1 className="text-white" key={index}>
//               <li className="mt-4 " id={index}>
//                 <div className="flex gap-2 md:flex-col mf:flex-row">
//                   <div className="w-9/12 h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
//                     <span className="text-black">{index + 1}.</span>
//                     <div className="ml-4 text-sm font-semibold text-black">
//                       {todo.title}
//                     </div>
//                   </div>
//                   <span className="w-1/6 h-12 bg-[#ff0000] rounded-[7px] flex justify-center text-sm text-[#ffffff] font-semibold items-center ">
//                     <LiaTrashSolid size={30} className="text-white" />
//                   </span>
//                   <span className="w-1/6 h-12 bg-[#ff0000] rounded-[7px] flex justify-center text-sm text-[#ffffff] font-semibold items-center ">
//                     <LuEdit size={30} className="text-white" />
//                   </span>
//                 </div>
//               </li>
//             </h1>
//           ))}
//         </ul>
//       </div>
//     </div>

//     {/* <div className="flex items-center justify-center">
//       <div className="h-auto p-4 bg-white rounded-lg w-96">

//         <p className="text-xl font-semibold mt-2 text-[#063c76]">
//           Your To-do List
//         </p>

//         <ul className="my-4 ">
//           <li className="mt-4 " id="1">
//             <div className="flex gap-2">
//               <div className="w-9/12 h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
//                 <span
//                   id="check1"
//                   className=" w-7 h-7 bg-white rounded-full border border-white transition-all cursor-pointer hover:border-[#36d344] flex justify-center items-center"
//                   onClick="checked(1)"
//                 >
//                   <i className="text-white fa fa-check"></i>
//                 </span>
//                 <strike
//                   id="strike1"
//                   className="strike_none text-sm ml-4 text-[#5b7a9d] font-semibold"
//                 >
//                   take out the trash Lorem, ipsum dolor.
//                 </strike>
//               </div>
//               <span className="w-1/6 h-12 bg-[#ff0000] rounded-[7px] flex justify-center text-sm text-[#ffffff] font-semibold items-center ">
//               <LiaTrashSolid  size={30} className='text-white' />
//               </span>
//               <span className="w-1/6 h-12 bg-[#ff0000] rounded-[7px] flex justify-center text-sm text-[#ffffff] font-semibold items-center ">
//               <LuEdit  size={30} className='text-white' />
//               </span>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div> */}

//     <div>
//       <IoIosAddCircle
//         size={160}
//         className="fixed flex items-center justify-center text-blue-700 cursor-pointer bottom-4 right-4"
//         onClick={() => handleClicked('addtodo')}
//       />
//     </div>
//   </div>
// ) : (
//   <div className="flex items-center justify-center h-[90vh] flex-col">
//     <h1 className="text-white">No Todo History</h1>
//     <div>
//       <IoIosAddCircle
//         size={160}
//         className="fixed flex items-center justify-center text-blue-700 cursor-pointer bottom-4 right-4"
//         onClick={() => handleClicked('addtodo')}
//       />
//     </div>
//   </div>
// )}
