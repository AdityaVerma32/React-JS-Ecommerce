import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartData: null,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            state.cartData = action.payload;
        }
    }
})

export const { addCart } = cartSlice.actions;

export default cartSlice.reducer;