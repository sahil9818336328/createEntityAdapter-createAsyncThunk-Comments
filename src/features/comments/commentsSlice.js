import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.id,
})

// FETCHING DATA
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (limit) => {
    return fetch(
      `https://jsonplaceholder.typicode.com/comments?_limit=${limit}`
    ).then((res) => res.json())
  }
)

// DELETING DATA
// ONCLICK DISPATCH DELETECOMMENTS, AND FIND A COMMENT WITH THE ID PROVIDED , DELETE IT ON THE SERVER AND RETURN THAT ID SO WE CAN REMOVE IT FROM THE UI AS WELL.
export const deleteComments = createAsyncThunk(
  'comments/deleteComments',
  async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: 'DELETE',
    })
    return id
  }
)

export const updateComments = createAsyncThunk(
  'comments/patchComment',
  async ({ id, newObj }) => {
    console.log(newObj)
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(newObj),
    })
    console.log(newObj)
    return { id, changes: newObj }
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState({
    isLoading: false,
    isError: false,
  }),
  reducers: {},
  extraReducers: {
    //  FETCH COMMENTS
    [fetchComments.pending]: (state) => {
      state.isLoading = true
    },
    [fetchComments.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      commentsAdapter.setAll(state, payload)
    },
    [fetchComments.rejected]: (state) => {
      state.isLoading = false
      state.isError = true
    },
    // DELETE COMMENTS
    [deleteComments.pending]: (state) => {
      state.isLoading = true
    },
    [deleteComments.fulfilled]: (state, { payload: id }) => {
      state.isLoading = false
      commentsAdapter.removeOne(state, id)
    },
    [deleteComments.rejected]: (state) => {
      state.isLoading = false
      state.isError = true
    },
    // UPDATE COMMENTS
    [updateComments.pending]: (state) => {
      state.isLoading = true
    },
    [updateComments.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      commentsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload.changes,
      })
    },
    [updateComments.rejected]: (state) => {
      state.isLoading = false
      state.isError = true
    },
  },
})

export const commentsSelector = commentsAdapter.getSelectors(
  (state) => state.comments
)
export const { actions } = commentsSlice
export default commentsSlice.reducer
