const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const loadingHandler = (state) => {
  state.isLoading = true;
};

export const fulfilledHandler = (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.data = action.payload;
};

export const rejectedHandler = (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
};

export default initialState;
