import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';


const core_url = 'https://todo-app-backend-n4ta.onrender.com/api';
const cookies = new Cookies();
const userId = cookies.get('userId');


const initialState = {
  user: {},
  loading: 'idle',
  error: null,
  isLoggedIn: false,
  userTodos: [],
  favouriteTodos: [],
};



export const getUserTodos = createAsyncThunk(
  'todo/getodos',
  async (_, thunkAPI) => {
    const headers = { 'Content-Type': 'application/json' };
    try {
      const response = await fetch(`${core_url}/todos/${userId}`, { headers });
      const data = await response.json();
      const todos = data.userTodos;

      return todos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getFavouriteTodos = createAsyncThunk(
  'todo/getfavourites',
  async (id, thunkAPI) => {
    const headers = { 'Content-Type': 'application/json' };
    try {
      const response = await fetch(`${core_url}/todos/favourite/${id}`, {
        headers,
      });
      const data = await response.json();
      const todos = data?.data.todos;
      return todos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserTodos.pending, (state) => {
        state.loading = 'pending'; // Set loading state to 'pending' when the API call starts
      })
      .addCase(getUserTodos.fulfilled, (state, action) => {
        state.userTodos = action.payload;
        state.loading = 'fulfilled'; // Set loading state to 'fulfilled' when the API call is successful
      })
      .addCase(getUserTodos.rejected, (state) => {
        state.loading = 'rejected'; // Set loading state to 'rejected' when the API call fails
      })
    .addCase(getFavouriteTodos.pending, (state) => {
      state.loading = 'pending';
    })
    .addCase(getFavouriteTodos.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.favouriteTodos = action.payload;
    })
    .addCase(getFavouriteTodos.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.payload;
    });

  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('todo_user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = initialState.user;
      localStorage.removeItem('todo_user');
    },
    removeAll: () => {
      return initialState
    },
    addTodo: (state, action) => {
      // const newItem = {
      //   // id: new Date().getTime().toString(),
      //   title: action.payload,
      //   description: action.payload,
      //   // checked: false,
      //   // editing: false,
      // }

      // state.userTodos.push(newItem)
      state.userTodos.unshift(action.payload);

      // return {
      //   ...state,
      //   userTodos: [...state.userTodos, newItem],
      // }
    },
    deleteTodo: (state, action) => {
      const newTodo = state.userTodos.filter(
        (item) => item.id !== action.payload
      )

      state.userTodos = newTodo
    },
    editTodoTitle: (state, action) => {
      return {
        ...state,
        userTodos: state.userTodos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              editing: !todo.editing,
              title: action.payload.title,
            }
          }
          return todo
        }),
      }
    },
    toggleEdit: (state, action) => {
      return {
        ...state,
        userTodos: state.userTodos.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, editing: !todo.editing }
          }
          return { ...todo, editing: false }
        }),
      }
    },
    checkTodo: (state, action) => {
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, checked: !todo.checked }
          }
          return todo
        }),
      }
    },
    // removeTodo: (state, action) => {
    //   const { todoId, id } = action.payload;
    //   const todo = state.userTodos.find((todo) => todo?._id === todoId);
    //   if (todo) {
    //     todo.todos = todo.filter((todoItem) => todoItem?.id !== id);
    //     state.userTodos = [...state.userTodos];
    //   }
    // },
    // editTodo: (state, action) => {
    //   const {
    //     todoId,
    //     id,
    //     title,
    //     description,
    //   } = action.payload;
    //   const todo = state.userTodos.find((todo) => todo?._id === todoId);
    //   if (todo) {
    //     let todo = todo?.find((t) => t?.id === id);
    //     if (todo) {
    //       todo.title = title;
    //       todo.description = description;
    //     }
    //   }
    // },

  },
});

export const {
  clearError,
  login,
  logout,
  removeAll,
  addTodo,
  deleteTodo,
  editTodoTitle,
  checkTodo,
  toggleEdit,
} = userSlice.actions;
export default userSlice.reducer;
