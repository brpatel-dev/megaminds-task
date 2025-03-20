import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: [],
    loading: false,
    error: null,
};

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload;
            state.loading = false;
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setBooks, setLoading, setError } = bookSlice.actions;
export default bookSlice.reducer;