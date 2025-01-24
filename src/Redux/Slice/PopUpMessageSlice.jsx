import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ErrorMessage: null,
    SuccessMessage: null
}

const PopUpSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.ErrorMessage = action.payload;
        },
        clearErrorMessage: (state) => {
            state.ErrorMessage = null;
        },
        setSuccessMessage: (state, action) => {
            state.SuccessMessage = action.payload;
        },
        clearSuccessMessage: (state) => {
            state.SuccessMessage = null;
        }
    }
})

export const { clearSuccessMessage, setSuccessMessage, clearErrorMessage, setErrorMessage } = PopUpSlice.actions;
export default PopUpSlice.reducer;