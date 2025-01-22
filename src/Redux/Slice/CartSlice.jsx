import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartData: null,
    loading: false,
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            const { success, message, data } = action.payload;
            state.loading = false;
            if (success) {
                state.cartData = data;
            } else {
                state.error = message;
            }
        }

    }
})

export const { addCart } = cartSlice.actions;

export default cartSlice.reducer;