import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    count: localStorage.getItem("count") || 0,
    price: localStorage.getItem("price") || 0,
    isLoading: false,
}

const baseUrl = 'https://stg.tdh.start-tech.ae/api';


export const addToCart = createAsyncThunk("cart/addToCart", async ({restaurant_id, item_id, quantity}) => {
    const response = await axios.post(`${baseUrl}/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/order/order-item`, {restaurant_id, item_id, quantity});
    return response?.data;
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
                
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.count = action.payload.data.count
            state.price = action.payload.data.price
            localStorage.setItem("count", action.payload.data.count);
            localStorage.setItem("price", action.payload.data.price);
        })
        .addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default cartSlice.reducer;