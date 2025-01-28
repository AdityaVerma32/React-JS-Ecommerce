import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import PopUpReducer from "./Slice/PopUpMessageSlice";
import cartReducer from "./Slice/CartSlice";
import shippingDetailsReducer from "./Slice/AddressSlice";
import orderReducer from "./Slice/OrderSlice";
import orderInProgressReducer from "./Slice/OrderInProgressSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    error: PopUpReducer,
    cart: cartReducer,
    shippingDetails: shippingDetailsReducer,
    order: orderReducer,  
    orderInProgress: orderInProgressReducer
});

export default rootReducer;