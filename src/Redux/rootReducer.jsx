import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import PopUpReducer from "./Slice/PopUpMessageSlice";
import cartReducer from "./Slice/CartSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    error: PopUpReducer,
    cart: cartReducer
    // add other reducers here
});

export default rootReducer;