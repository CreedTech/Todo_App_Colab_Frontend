// import React from 'react';
import Cookies from 'universal-cookie';
import { useContextProvider } from '../contexts/ContextProvider';
import { useFormInputs } from '../hooks';
import { useAppDispatch } from '../hooks';
import axios from 'axios';
import { addTodo } from '../redux/slice/todoSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Fallback from './Fallback';

const url = 'https://todo-app-backend-n4ta.onrender.com/api/todos/';
const initialState = {
  title: '',
  description: '',
};
const AddTodoPopup = () => {
  const { handleUnclicked } = useContextProvider();
  const { inputs, bind } = useFormInputs(initialState);
  const { title, description } = inputs;
  const cookies = new Cookies();
  const userId = cookies.get('userId');
  const dispatch = useAppDispatch();
  const { triggerRefresh } = useContextProvider();
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description)
      return toast.error("Please fill all fields");
    const headers = { 'Content-Type': 'application/json' };
    setLoading(true);
    const payload = { title, description, userId };
    // setLoading(true);
    try {
      const data = await axios({
        method: 'POST',
        url,
        data: payload,
        headers,
      });

      setLoading(false);
      console.log(data);
      if (!data || data === null) return;
      dispatch(addTodo(payload));
      triggerRefresh();
      // cookies.set('userId', data.data.id);
      setLoading(false);
      handleUnclicked();
      toast.success('Data Added successfully!🚀.');
      // const timeout = setTimeout(() => navigate('/'), 1000);
      // return () => clearTimeout(timeout);
    } catch (error) {
      setLoading(false);
      // setError(error.response.data.message);
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      handleUnclicked();
    }
  };
  return (
    <>
      {loading && <Fallback />}
    <div onClick={() => handleUnclicked('addtodo')}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-0 z-[9999950] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-opacity-70 bg-gray-700"
      >
        <div
          tabIndex="-1"
          aria-hidden="true"
          className="relative w-full max-w-md max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleUnclicked('addtodo')}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Create Your New Todo
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      {...bind}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter your title"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      {...bind}
                      placeholder="Enter your description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-[45%] mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Create
                  </button>
                  <button
                    type="submit"
                    className="w-[45%] mx-2 text-white bg-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    onClick={() => handleUnclicked("addtodo")}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddTodoPopup;

