import {
  login,
  logout,
  register,
} from '@/apis/auth';
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export const loginThunk = createAsyncThunk("auth/login", login);

export const registerThunk = createAsyncThunk("auth/register", register);

export const logoutThunk = createAsyncThunk("auth/logout", logout);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loadingLogin: false,
        loadingLogout: false,
        error: null,
    },
    reducers: {
        clearUserLogout(state) {
            state.user = null;
            state.loadingLogout = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loadingLogin = true;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loadingLogin = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loadingLogin = false;
                state.error = action.error.message;
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.user = action.payload;
            })

            .addCase(logoutThunk.pending, (state) => {
                state.loadingLogout = true;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.user = null;
                state.loadingLogout = false;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.loadingLogout = false;
            });
    },
});

export const { clearUserLogout } = authSlice.actions;

export default authSlice.reducer;
