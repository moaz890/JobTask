import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice"
import categorySlice from "./categorySlice"
import itemSlice from "./itemSlice"

const store = configureStore({
    reducer: {
        cart: cartSlice,
        category: categorySlice,
        item: itemSlice,
    }
});

export default store;