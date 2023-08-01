// import { createSlice } from '@reduxjs/toolkit';

// // import { APIType,DiscussionType, ChildrenDiscussionType } from "../../types";
// // import { headers } from "./constant";
// // import Cookies from "universal-cookie";
// // const cookies = new Cookies();
// // const url = import.meta.env.VITE_CORE_URL;
// // const api_Id = "03f20287-9602-47bc-b5bc-50b7b223b3d3"

// const initialState = {
//   todos: [],
//   loading: 'idle',
//   error: null,
// };

// // export const getApiCategories = createAsyncThunk(
// //   "apis/getApiCategories",
// //   async (_, thunkAPI) => {
// //     const headers = {
// //       "X-Zapi-Auth-Token": `Bearer ${cookies.get("accessToken")}`,
// //     };
// //     try {
// //       const response = await fetch(`${url}/categories`, { headers });
// //       const data = await response.json();
// //       return data.data;
// //     } catch (error: any) {
// //       return thunkAPI.rejectWithValue(error.message);
// //     }
// //   }
// // );
// // export const getValidCategories = createAsyncThunk(
// //   "apis/getValidCategories",
// //   async (_, thunkAPI) => {
// //     const headers = {
// //       "X-Zapi-Auth-Token": `Bearer ${cookies.get("accessToken")}`,
// //     };
// //     try {
// //       const response = await fetch(`${url}/categories/valid-categories`, {
// //         headers,
// //       });
// //       const data = await response.json();
// //       return data.data;
// //     } catch (error: any) {
// //       return thunkAPI.rejectWithValue(error.message);
// //     }
// //   }
// // );

// // export const getPopularApis = createAsyncThunk(
// //   "apis/getPopularApis",
// //   async (_, thunkAPI) => {
// //     const headers = {
// //       "X-Zapi-Auth-Token": `Bearer ${cookies.get("accessToken")}`,
// //     };
// //     try {
// //       const response = await fetch(`${url}/api/popular-apis`, { headers });
// //       const data = await response.json();
// //       return data.data;
// //     } catch (error: any) {
// //       return thunkAPI.rejectWithValue(error.message);
// //     }
// //   }
// // );

// // export const getApis = createAsyncThunk("apis/getApis", async (_, thunkAPI) => {
// //   const headers = {
// //     "X-Zapi-Auth-Token": `Bearer ${cookies.get("accessToken")}`,
// //   };
// //   try {
// //     const response = await fetch(`${url}/api?limit=100`, { headers });
// //     const data = await response.json();
// //     return data.data;
// //   } catch (error: any) {
// //     return thunkAPI.rejectWithValue(error.message);
// //   }
// // });
// // export const getApisDiscussion = createAsyncThunk("apis/getApisDiscussion", async(api_id: any, thunkAPI) => {
// //     const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }
// //     try {
// //         const response = await fetch(`${url}/api/dev-platform-data/discussion/${api_id}`, {headers})
// //         const data = await response.json()
// //         const discussions = data?.data.discussions
// //         return discussions
// //     } catch (error: any) {
// //         return thunkAPI.rejectWithValue(error.message)
// //     }
// // })
// // export const getApisChildrenDiscussion = createAsyncThunk("apis/getApisChildrenDiscussion", async(discussionId: any, thunkAPI) => {
// //     const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }
// //     try {
// //         const response = await fetch(`${url}/dev-platform-data/discussion/${discussionId}`, {headers})
// //         const data = await response.json()
// //         const childrenDiscussions = data?.data.childrenDiscussions
// //         return childrenDiscussions
// //     } catch (error: any) {
// //         return thunkAPI.rejectWithValue(error.message)
// //     }
// // })

// const todoSlice = createSlice({
//   name: 'todos',
//   initialState,
//   reducers: {
//     addTodo: (state, action) => {
//       state.todos.unshift(action.payload);
//     },
//     removeTodo: (state, action) => {
//       const id = action.payload;
//       state.todos = state.todos.filter((todos) => todos?.id !== id);
//     },
//     // addDiscussion: (state, action) => {
//     //     const { todoId, title, body } = action.payload
//     //     const todo = state.todos.find(todo => todo?.id === todoId)
//     //     let newDiscussion = {title, body}
//     //     if(todo) {
//     //         todo.discussions?.unshift(newDiscussion)
//     //     }
//     // },
//     // removeDiscussion: (state, action) => {
//     //     const { todoId, id } = action.payload
//     //     const todo =state.todos.find(todo => todo?.id === todoId)
//     //     if(todo) {
//     //         todo.discussions = todo.discussions?.filter(discussion => discussion?.id !== id)
//     //     }
//     // },
//     // editDiscussion: (state, action) => {
//     //     const { todoId,id, title, body } = action.payload
//     //     const todo =state.todos.find(todo => todo?.id === todoId)
//     //     if(todo) {
//     //         let discussion = todo.discussions?.find(discussion => discussion?.id === id)
//     //         if(discussion) {
//     //             discussion.title = title
//     //             discussion.body = body
//     //         }
//     //     }
//     // },
//     // addChildrenDiscussion: (state, action) => {
//     //     const { discussionId, body } = action.payload
//     //     const discussions = state.discussions.find(discussion => discussion?.id === discussionId)
//     //     let newDiscussion = {body}
//     //     if(discussions) {
//     //      discussions.childrenDiscussion?.unshift(newDiscussion)

//     //     }
//     // },
//     // removeChildrenDiscussion: (state, action) => {
//     //     const { discussionId, id } = action.payload
//     //     const discussions =state.discussions.find(discussion => discussion?.id === discussionId)
//     //     if(discussions) {
//     //         discussions.childrenDiscussion = discussions.childrenDiscussion?.filter(discussion => discussion?.id !== id)
//     //     }
//     // },
//     // editChildrenDiscussion: (state, action) => {
//     //     const { discussionId,id, body } = action.payload
//     //     const discussions =state.discussions.find(discussion => discussion?.id === discussionId)
//     //     if(discussions) {
//     //         let discussion = discussions.childrenDiscussion?.find(discussion => discussion?.id === discussionId)
//     //         if(discussion) {
//     //             discussion.body = body
//     //         }
//     //     }
//     // },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   //   extraReducers: (builder) => {
//   //     builder.addCase(getApis.pending, (state) => {
//   //       state.loading = "pending";
//   //     }),
//   //       builder.addCase(getApis.fulfilled, (state, { payload }) => {
//   //         state.apis = payload;
//   //         state.loading = "fulfilled";
//   //       }),
//   //       builder.addCase(getApis.rejected, (state, action) => {
//   //         state.loading = "rejected";
//   //         state.error = action.payload;
//   //       }),
//   //       builder.addCase(getApiCategories.pending, (state) => {
//   //         state.loading = "pending";
//   //       }),
//   //       builder.addCase(getApiCategories.fulfilled, (state, { payload }) => {
//   //         state.categories = payload;
//   //         state.loading = "fulfilled";
//   //       }),
//   //       builder.addCase(
//   //         getApiCategories.rejected,
//   //         (state, action) => {
//   //           state.loading = "rejected";
//   //           state.error = action.payload;
//   //         }
//   //       );
//   //     builder.addCase(getPopularApis.pending, (state) => {
//   //       state.loading = "pending";
//   //     }),
//   //       builder.addCase(getPopularApis.fulfilled, (state, { payload }) => {
//   //         state.categories = payload;
//   //         state.loading = "fulfilled";
//   //       }),
//   //       builder.addCase(
//   //         getPopularApis.rejected,
//   //         (state, action) => {
//   //           state.loading = "rejected";
//   //           state.error = action.payload;
//   //         }
//   //       );
//   //     builder.addCase(getValidCategories.pending, (state) => {
//   //       state.loading = "pending";
//   //     }),
//   //       builder.addCase(getValidCategories.fulfilled, (state, { payload }) => {
//   //         state.categories = payload;
//   //         state.loading = "fulfilled";
//   //       }),
//   //       builder.addCase(
//   //         getValidCategories.rejected,
//   //         (state, action) => {
//   //           state.loading = "rejected";
//   //           state.error = action.payload;
//   //         }
//   //       );
//   //     builder.addCase(getApisDiscussion.pending, (state) => {
//   //       state.loading = "pending";
//   //     }),
//   //       builder.addCase(getApisDiscussion.fulfilled, (state, { payload }) => {
//   //         state.categories = payload;
//   //         state.loading = "fulfilled";
//   //       }),
//   //       builder.addCase(
//   //         getApisDiscussion.rejected,
//   //         (state, action) => {
//   //           state.loading = "rejected";
//   //           state.error = action.payload;
//   //         }
//   //       );
//   //     builder.addCase(getApisChildrenDiscussion.pending, (state) => {
//   //       state.loading = "pending";
//   //     }),
//   //       builder.addCase(getApisChildrenDiscussion.fulfilled, (state, { payload }) => {
//   //         state.categories = payload;
//   //         state.loading = "fulfilled";
//   //       }),
//   //       builder.addCase(
//   //         getApisChildrenDiscussion.rejected,
//   //         (state, action) => {
//   //           state.loading = "rejected";
//   //           state.error = action.payload;
//   //         }
//   //       );
//   //   },
// });

// export const {
//   addTodo,
//   removeTodo,
//   // addDiscussion, addChildrenDiscussion, editDiscussion, editChildrenDiscussion, removeDiscussion, removeChildrenDiscussion,
//   clearError,
// } = todoSlice.actions;
// export default todoSlice.reducer;
