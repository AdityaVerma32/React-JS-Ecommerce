import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderData: null,
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orderData = action.payload;
        }
    }
});

export const { addOrder } = orderSlice.actions;
export const selectOrderData = (state) => state.order.orderData;

export default orderSlice.reducer;