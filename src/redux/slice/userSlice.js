import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

// import { UserProfileType, APIType, SubscriptionType, SubscribedUser } from "../../types";

const core_url = 'https://todo-app-backend-n4ta.onrender.com/api';
// const identity_url = import.meta.env.VITE_IDENTITY_URL;
const cookies = new Cookies();
const userId = cookies.get('userId');
// const profileId = cookies.get("profileId")

// interface UserState {
//     user: UserProfileType | Object
//     userTodos: Array<APIType>
//     subscribedTodos: Array<SubscriptionType>
//     subscribedUsers: Array<SubscribedUser>
//     loading: "idle" | "pending" | "fulfilled" | "rejected"
//     error?
//     isLoggedIn: boolean
// }

const initialState = {
  user: {},
  loading: 'idle',
  error: null,
  isLoggedIn: false,
  userTodos: [],
  favouriteTodos: [],
};

// export const getUserProfile = createAsyncThunk(
//   'user/getprofile',
//   async (_, thunkAPI) => {
//     // const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }
//     // try {
//     //     const response = await fetch(`${identity_url}/profile/${userId}`,
//     //         // { headers }
//     //     ) //sendRequest() function needs to replace this
//     //     const data = await response.json()
//     //     return data
//     // } catch (error) {
//     //     return thunkAPI.rejectWithValue(error.message)
//     // }
//   }
// );

export const getUserTodos = createAsyncThunk(
  'todo/getodos',
  async (_, thunkAPI) => {
    const headers = { 'Content-Type': 'application/json' };
    try {
      const response = await fetch(`${core_url}/todos/${userId}`, { headers });
      const data = await response.json();
      // console.log('todo data');
      // console.log(data);
      const todos = data.userTodos;
      // console.log('todos');
      // console.log(todos);

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

// export const getSubscribedUsers = createAsyncThunk(
//   'user/getSubscribedUsers',
//   async (id, thunkAPI) => {
//     // const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }
//     // try {
//     //   const response = await fetch(
//     //     `${core_url}/api/subscriptions/${id}`
//     //     // { headers }
//     //   );
//     //   const data = await response.json();
//     //   const user = data.data;
//     //   return user;
//     // } catch (error) {
//     //   return thunkAPI.rejectWithValue(error.message);
//     // }
//   }
// );

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserTodos.fulfilled, (state, action) => {
      state.userTodos = action.payload
  })
    builder.addCase(getFavouriteTodos.fulfilled, (state, action) => {
      state.favouriteTodos = action.payload
    });
    // builder.addCase(getSubscribedUsers.fulfilled, (state, action) => {
    //   state.subscribedUsers = action.payload;
    // });
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
    addTodo: (state, action) => {
      const { todoId, title, method, route, description, headers, requestBody } =
        action.payload;
      const todo = state.userTodos.find((todo) => todo?._id === todoId);
      let newTodo = {
        title,
        method,
        route,
        description,
        headers,
        requestBody,
      };
      if (todo) {
        todo.unshift(newTodo);
      }
    },
    removeTodo: (state, action) => {
      const { todoId, id } = action.payload;
      const todo = state.userTodos.find((todo) => todo?._id === todoId);
      if (todo) {
        todo?.filter((todo) => todo?.id !== id);
      }
    },
    editTodo: (state, action) => {
      const {
        todoId,
        id,
        title,
        method,
        route,
        description,
        headers,
        requestBody,
      } = action.payload;
      const todo = state.userTodos.find((todo) => todo?.id === todoId);
      if (todo) {
        let todo = todo?.find((t) => t?.id === id);
        if (todo) {
          todo.title = title;
          todo.method = method;
          todo.route = route;
          todo.description = description;
          todo.headers = headers;
          todo.requestBody = requestBody;
        }
      }
    },

  },
});

export const {
  clearError,
  login,
  logout,
  addTodo,
  removeTodo,
  editTodo,
} = userSlice.actions;
export default userSlice.reducer;
