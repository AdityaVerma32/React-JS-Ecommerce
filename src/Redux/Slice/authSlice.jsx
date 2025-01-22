import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    userDetails: null,
    role: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        LoginSuccess: (state, action) => {
            console.log(action.payload);
            const { success, message, data } = action.payload;

            state.loading = false;
            if (success) {
                state.token = data.token;
                state.userDetails = data.User;
                state.role = data.role;
                // Save token to localStorage for API requests
                localStorage.setItem("token", data.token);
            } else {
                state.error = message;
            }
        },
        LoginRequest: (state) => {
            state.loading = true;
        },
        LoginError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.token = null;
            state.userDetails = null;
            state.role = null;

            // Clear all auth-related data from localStorage

            localStorage.removeItem("auth");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userDetails"); // Remove userDetails if needed
            localStorage.removeItem("error");
            localStorage.removeItem("loading"); 
        },
    }
})

export const { LoginSuccess, logout, LoginRequest, LoginError } = authSlice.actions;

export default authSlice.reducer;