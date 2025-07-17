import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // We'll create this

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;