import { IoIosAddCircle } from 'react-icons/io';
import { LiaTrashSolid } from 'react-icons/lia';
import { LuEdit } from 'react-icons/lu';
import { BsCheckAll } from 'react-icons/bs';
import { AiOutlineClear } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Fallback from './Fallback';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { login } from '../redux/slice/userSlice';
import '../App.css'

const Main = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userId = cookies.get('userId');
  const dispatch = useAppDispatch();

  // State variables
  const [tasks, setTasks] = useState([]); // Holds the list of tasks
  const [inputValue, setInputValue] = useState(''); // Holds the value of the input field
  const [filter, setFilter] = useState('all'); // Holds the current filter type
  const [isLoading, setIsLoading] = useState(true); // Indicates whether the data is being loaded
  const [editTaskId, setEditTaskId] = useState(null); // Holds the ID of the task being edited

  useEffect(() => {
    const loginUser = () => {
      const item = localStorage.getItem('todo_user');
      if (!item) return;
      const user = JSON.parse(item);
      dispatch(login(user));
    };
    loginUser();
  }, []);

  // useEffect(() => {
  //   if (userId === undefined) return;
  //   fetchTodos();
  // }, [userId]);
  // Fetch initial data
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch todos from an API
  const fetchTodos = async () => {
    try {
      const response = await fetch(
        `https://todo-app-backend-n4ta.onrender.com/api/todos/${userId}`
      );
      const todos = await response.json();
      console.log(todos);
      setTasks(todos.userTodos);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching todos:', error);
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Add a new task
  const handleAddTask = async () => {
    if (inputValue.trim() === '') {
      return;
    }

    const newTask = {
      title: inputValue,
      status: false,
      description: 'gvkhjblhv',
      userId,
    };

    try {
      const response = await fetch(
        'https://todo-app-backend-n4ta.onrender.com/api/todos/',
        {
          method: 'POST',
          body: JSON.stringify(newTask),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      const addedTask = await response.json();
      // addedTask.completed = false;
      console.log(addedTask);
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setInputValue('');
      toast.success('Task added successfully');
    } catch (error) {
      console.log('Error adding task:', error);
      toast.error('Error adding task');
    }
  };

  // Handle checkbox change for a task
  const handleTaskCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      Object.values(prevTasks).map((task) =>
        task._id === taskId ? { ...task, status: !task.status } : task
      )
    );
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `https://todo-app-backend-n4ta.onrender.com/api/todos/delete/${taskId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      const deleteTaskData = await response.json();
      deleteTaskData.status = true;
      console.log(deleteTaskData);
      setTasks((prevTasks) =>
        Object.values(prevTasks).filter((task) => task._id !== taskId)
      );
      // setInputValue('');
      // setEditTaskId(null);
      toast.success('Task deleted successfully');
    } catch (error) {
      console.log('Error deleting task:', error.message);
      toast.error('Error deleting task');
    }
  };
  //   (taskId) => {
  //   setTasks((prevTasks) => Object.values(prevTasks).filter((task) => task._id !== taskId));
  //   toast.success('Task deleted successfully');
  // };

  // Edit a task
  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
    const taskToEdit = Object.values(tasks).find((task) => task._id === taskId);
    setInputValue(taskToEdit.title);
  };

  // Update a task
  const handleUpdateTask = async () => {
    if (inputValue.trim() === '') {
      return;
    }

    // const updatedTask = {
    //   title: inputValue,
    //   // completed: false,
    //   description: 'gvkhjblhv',
    // };

    try {
      const response = await fetch(
        `https://todo-app-backend-n4ta.onrender.com/api/todos/${editTaskId}`,
        {
          method: 'PUT',
          // body: JSON.stringify(updatedTask),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      const updatedTaskData = await response.json();
      // updatedTaskData.completed = false;
      console.log(updatedTaskData);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === editTaskId
            ? { ...task, title: updatedTaskData.title }
            : task
        )
      );
      setInputValue('');
      setEditTaskId(null);
      toast.success('Task updated successfully');
    } catch (error) {
      console.log('Error updating task:', error);
      toast.error('Error updating task');
    }
  };

  // Mark all tasks as completed
  const handleCompleteAll = () => {
    setTasks((prevTasks) =>
      Object.values(prevTasks).map((task) => ({ ...task, status: true }))
    );
  };

  // Clear completed tasks
  const handleClearCompleted = () => {
    setTasks((prevTasks) =>
     Object.values(prevTasks).filter((task) => !task.status)
    );
  };

  // Handle filter change
  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  // Filter tasks based on the selected filter
  const filteredTasks = isLoggedIn && Object.values(tasks).filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'status') {
      return task.status;
    } else if (filter === 'uncompleted') {
      return !task.status;
    }
    return true;
  });

  if (isLoading) {
    return <Fallback />;
  }

  return (
    <div>
      {isLoggedIn ? (
        <>
          <div className="flex items-center justify-center  flex-col">
            <div className="flex items-center justify-center">
              <div className="h-auto p-4 px-12 bg-white rounded-lg md:w-[40rem] w-96">
                <p className="text-xl font-semibold text-center text-black">
                  Your To-do List
                </p>
                <div className="flex my-4">
                  <input
                    type="text"
                    className="add-task bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block  m-w-0 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    id="add"
                    placeholder="Add your todo"
                    autoFocus
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <button
                    type="submit"
                    id="btn"
                    onClick={editTaskId ? handleUpdateTask : handleAddTask}
                    className=" items-center w-[45%] mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {editTaskId ? 'Update' : 'Add'}
                  </button>
                </div>

                <div className="flex flex-col justify-between my-4 mf:flex-row ">
                  <div className="flex items-center">
                  <BsCheckAll className='pr-2' size={30}/>
                  <p id="complete-all" className='text-xl cursor-pointer' onClick={handleCompleteAll}>
                    Complete all tasks
                  </p>
                  </div>
                  <div className='flex items-center'>
                  <AiOutlineClear className='pr-2' size={30}/>
                  <p id="clear-all" className='text-lg cursor-pointer' onClick={handleClearCompleted}>
                    Delete comp tasks
                  </p>
                  </div>
                </div>
                <ul className="my-4" id="list">
                  {filteredTasks.map((task, index) => (
                    <li className="mt-4 " key={task._id}>
                      <div className="flex gap-2 md:flex-col mf:flex-row">
                        <div className="w-9/12 h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
                          <span className="text-black">{index + 1}.</span>
                          <input
                            type="checkbox"
                            id={`task-${task._id}`}
                            data-id={task._id}
                            className="custom-checkbox"
                            checked={task.status}
                            onChange={() => handleTaskCheckboxChange(task._id)}
                          />

                          <div className="ml-4 text-sm font-semibold text-black">
                            <label htmlFor={`task-${task._id}`} style={task.status ? {textDecoration: 'line-through', color:'red'} : {}}>
                              {task.title}
                            </label>
                          </div>
                        </div>
                        <span
                          data-id={task._id}
                          onClick={() => handleEditTask(task._id)}
                          className="w-1/6 h-12 bg-[#00ff51] rounded-[7px] flex justify-center text-sm text-[#ffffff] font-semibold items-center "
                        >
                          <LuEdit size={30} className="text-white" />
                        </span>
                        <span
                          data-id={task._id}
                          onClick={() => handleDeleteTask(task._id)}
                          className="w-1/6 h-12 bg-[#ff0000] rounded-[7px] flex justify-center text-sm text-[#ffffff] font-semibold items-center "
                        >
                          <LiaTrashSolid size={30} className="text-white" />
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="filters">
                  <div className="dropdown">
                    <button className="dropbtn">Filter</button>
                    <div className="dropdown-content">
                      <a
                        href="#"
                        id="all"
                        onClick={() => handleFilterChange('all')} >
                        All
                      </a>
                      <a
                        href="#"
                        id="rem"
                        onClick={() => handleFilterChange('uncompleted')} >
                        Uncompleted
                      </a>
                      <a
                        href="#"
                        id="com"
                        onClick={() => handleFilterChange('status')} >
                        Completed
                      </a>
                    </div>
                  </div>

                  <div className="completed-task">
                    <p>
                      Completed:{' '}
                      <span id="c-count">
                        {
                          Object.values(tasks).filter((task) => task.status)
                            .length
                        }
                      </span>
                    </p>
                  </div>
                  <div className="remaining-task">
                    <p>
                      <span id="total-tasks">
                        Total Tasks:{' '}
                        <span id="tasks-counter">{tasks.length}</span>
                      </span>
                    </p>
                  </div>

                  {/* <div className='flex justify-around my-3'>
                  <div className="completed-task">
                    <p>
                      Completed:{' '}
                      <span id="c-count">
                        {
                          Object.values(tasks).filter((task) => task.status)
                            .length
                        }
                      </span>
                    </p>
                  </div>
                  <div className="remaining-task">
                    <p>
                      <span id="total-tasks">
                        Total Tasks:{' '}
                        <span id="tasks-counter">{tasks.length}</span>
                      </span>
                    </p>
                  </div>
                 </div> */}
                </div>
              </div>
            </div>
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
