import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ShippingDetails: null
}

const shippingDetailsSlice = createSlice({
    name: 'shippingDetails',
    initialState,
    reducers: {
        addShippingDetails: (state, action) => {
            state.ShippingDetails = action.payload;
        }
    }
})

export const { addShippingDetails } = shippingDetailsSlice.actions;
export const selectShippingDetails = (state) => state.shippingDetails.ShippingDetails;

export default shippingDetailsSlice.reducer;