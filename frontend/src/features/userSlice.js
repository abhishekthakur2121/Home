import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
  otpSent: false,
  isLoggedIn: false,
  loginMethod: 'password', // 'password' or 'otp'
};

// (for Axios integration)
export const signupUser = createAsyncThunk('auth/signupUser', async (data) => {
  console.log('Signup API called:', data);
  return { ...data, id: Date.now() };
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginMethod: (state, action) => {
      state.loginMethod = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.otpSent = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoginMethod, logoutUser } = authSlice.actions;
export default authSlice.reducer;
