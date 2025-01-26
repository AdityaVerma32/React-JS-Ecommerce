import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import PopUpReducer from "./Slice/PopUpMessageSlice";
import cartReducer from "./Slice/CartSlice";
import shippingDetailsReducer from "./Slice/AddressSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    error: PopUpReducer,
    cart: cartReducer,
    shippingDetails: shippingDetailsReducer,
    // add other reducers here
});

export default rootReducer;