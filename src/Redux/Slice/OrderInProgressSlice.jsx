import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems : null
}

const orderInProgressSlice = createSlice({
    name: 'orderInProgress',
    initialState,
    reducers: {
        addOrderInProgress: (state, action) => {
            state.orderItems = action.payload;
        },

    }
})

export default orderInProgressSlice.reducer;

export const { addOrderInProgress } = orderInProgressSlice.actions;

