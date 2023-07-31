import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from "universal-cookie";

// import { UserProfileType, APIType, SubscriptionType, SubscribedUser } from "../../types";

// const core_url = import.meta.env.VITE_CORE_URL;
// const identity_url = import.meta.env.VITE_IDENTITY_URL;
const cookies = new Cookies()
const userId = cookies.get('userId');
// const profileId = cookies.get("profileId")

// interface UserState {
//     user: UserProfileType | Object
//     userApis: Array<APIType>
//     subscribedApis: Array<SubscriptionType>
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
  userApis: [],
  subscribedApis: [],
  subscribedUsers: [],
};

export const getUserProfile = createAsyncThunk(
  'user/getprofile',
  async (_, thunkAPI) => {
    // const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }
    // try {
    //     const response = await fetch(`${identity_url}/profile/${userId}`,
    //         // { headers }
    //     ) //sendRequest() function needs to replace this
    //     const data = await response.json()
    //     return data
    // } catch (error) {
    //     return thunkAPI.rejectWithValue(error.message)
    // }
  }
);

export const getUserTodos = createAsyncThunk(
  'user/getapis',
  async (id, thunkAPI) => {
    // const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }
    // try {
    //     const response = await fetch(`${core_url}/api/dev-platform-data/${id}`,
    //         // { headers }
    //     )
    //     const data = await response.json()
    //     const apis = data?.data.apis
    //     return apis
    // } catch (error) {
    //     return thunkAPI.rejectWithValue(error.message)
    // }
  }
);

export const getFavouriteTodos = createAsyncThunk(
  'user/getsubscribed',
  async (id, thunkAPI) => {
    // const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }
    // try {
    //   const response = await fetch(
    //     `${core_url}/api/dev-platform-data/${id}`
    //     // { headers }
    //   );
    //   const data = await response.json();
    //   const subscribed = data?.data.userSubscriptions;
    //   return subscribed;
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error.message);
    // }
  }
);

export const getSubscribedUsers = createAsyncThunk(
  'user/getSubscribedUsers',
  async (id, thunkAPI) => {
    // const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }
    // try {
    //   const response = await fetch(
    //     `${core_url}/api/subscriptions/${id}`
    //     // { headers }
    //   );
    //   const data = await response.json();
    //   const user = data.data;
    //   return user;
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error.message);
    // }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = 'pending';
    }),
      builder.addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.user = action.payload;
      }),
      builder.addCase(getUserProfile.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload;
      }),
      builder.addCase(getUserTodos.fulfilled, (state, action) => {
        state.userApis = action.payload;
      });
    builder.addCase(getFavouriteTodos.fulfilled, (state, action) => {
      state.subscribedApis = action.payload;
    });
    builder.addCase(getSubscribedUsers.fulfilled, (state, action) => {
      state.subscribedUsers = action.payload;
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
    addEndpoint: (state, action) => {
      const { apiId, name, method, route, description, headers, requestBody } =
        action.payload;
      const api = state.userApis.find((api) => api?.id === apiId);
      let newEndpoint = {
        name,
        method,
        route,
        description,
        headers,
        requestBody,
      };
      if (api) {
        api.endpoints?.unshift(newEndpoint);
      }
    },
    removeEndpoint: (state, action) => {
      const { apiId, id } = action.payload;
      const api = state.userApis.find((api) => api?.id === apiId);
      if (api) {
        api.endpoints = api.endpoints?.filter(
          (endpoint) => endpoint?.id !== id
        );
      }
    },
    editEndpoint: (state, action) => {
      const {
        apiId,
        id,
        name,
        method,
        route,
        description,
        headers,
        requestBody,
      } = action.payload;
      const api = state.userApis.find((api) => api?.id === apiId);
      if (api) {
        let endpoint = api.endpoints?.find((endpoint) => endpoint?.id === id);
        if (endpoint) {
          endpoint.name = name;
          endpoint.method = method;
          endpoint.route = route;
          endpoint.description = description;
          endpoint.headers = headers;
          endpoint.requestBody = requestBody;
        }
      }
    },
    editAPI: (state, action) => {
      const {
        id,
        description,
        base_url,
        about,
        categoryId,
        api_website,
        term_of_use,
        visibility,
        read_me,
      } = action.payload;
      const api = state.userApis.find((api) => api?.id === id);
      if (api) {
        api.description = description;
        api.base_url = base_url;
        api.about = about;
        api.categoryId = categoryId;
        api.api_website = api_website;
        api.term_of_use = term_of_use;
        api.visibility = visibility;
        api.read_me = read_me;
      }
    },
  },
});

export const {
  clearError,
  login,
  logout,
  addEndpoint,
  removeEndpoint,
  editEndpoint,
  editAPI,
} = userSlice.actions;
export default userSlice.reducer;
