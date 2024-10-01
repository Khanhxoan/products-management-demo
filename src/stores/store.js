import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/";

export const store = configureStore({
    reducer: {
        products: productReducer,
    },
});
