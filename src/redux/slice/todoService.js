import axios from 'axios';

const API_URL = 'https://todo-app-backend-n4ta.onrender.com/api/todos/';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const userId = cookies.get('userId');

// create new todo

const createTodo = async (todoData) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await axios.post(API_URL, todoData, config);
  return response.data;
};

// get user todos

const getTodos = async () => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await axios.get(`${API_URL}${userId}`, config);
  return response.data;
};

// Update user todo

const updateTodo = async (todoId) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await axios.put(API_URL + todoId, config);
  return response.data;
};

// Delete user todo

const deleteTodo = async (todoId) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await axios.delete(API_URL + todoId, config);
  return response.data;
};

const todoService = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
export default todoService;
