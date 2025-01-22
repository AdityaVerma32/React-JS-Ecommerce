import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import errorReducer from "./Slice/ErrorSlice";
import cartReducer from "./Slice/CartSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    cart: cartReducer
    // add other reducers here
});

export default rootReducer;