// Utility to wrap thunk actions to make them compatible with TypeScript Redux

// This is a helper function to wrap your Redux thunk actions
// It ensures TypeScript doesn't complain about dispatch(thunkAction())
export const createAppAsyncThunk = (actionCreator) => {
    return (...args) => {
        // This wrapper returns a function that is compatible with dispatch
        return (dispatch, getState) => {
            // Call the original action creator with the arguments
            return actionCreator(...args)(dispatch, getState)
        }
    }
}

// Re-export your thunk actions with proper TypeScript typing
// Example:
// import { subscribe as subscribeOriginal } from './app';
// export const subscribe = createAppAsyncThunk(subscribeOriginal);
