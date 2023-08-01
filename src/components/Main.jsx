import { IoIosAddCircle } from 'react-icons/io';
import { useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import Modal from './Modal';
import { useContextProvider } from '../contexts/ContextProvider';

const Main = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { handleClicked } = useContextProvider();
  const { userTodos } = useAppSelector((store) => store.user);
  console.log('userTodos');
  console.log(userTodos.title);

  return (
    <div>
      {isLoggedIn ? (
        <>
          {userTodos.length !== 0 ? (
            <div className="flex items-center justify-center h-[90vh] flex-col">
              {userTodos.map((todo, index) => (
                <h1 className="text-white" key={index}>
                  {todo.title}
                </h1>
              ))}

              <div>
                <IoIosAddCircle
                  size={160}
                  className="fixed flex items-center justify-center text-blue-700 cursor-pointer bottom-4 right-4"
                  onClick={() => handleClicked('addtodo')}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[90vh] flex-col">
              <h1 className="text-white">No Todo History</h1>
              <div>
                <IoIosAddCircle
                  size={160}
                  className="fixed flex items-center justify-center text-blue-700 cursor-pointer bottom-4 right-4"
                  onClick={() => handleClicked('addtodo')}
                />
              </div>
            </div>
          )}
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
