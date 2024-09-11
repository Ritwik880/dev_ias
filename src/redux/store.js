import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { cartReducer } from "./authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    },
});