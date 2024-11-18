import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    categories: [],
    isLoading: true,
    categoryItems: [],
    itemDetails: null,
    restaurantId: null,
}

const baseUrl = 'https://stg.tdh.start-tech.ae/api';

export const fetchCategories = createAsyncThunk("category/fetchCategories", async () => {    
    const response = await axios.get(`${baseUrl}/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/categories/2da6c53a-522d-485d-b77c-2fafd601ff0c`);
    return response.data;
})


export const fetchCategoryItems = createAsyncThunk("category/fetchCategoryItems", async (categoryId, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${baseUrl}/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/2da6c53a-522d-485d-b77c-2fafd601ff0c?cat=${categoryId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})





const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setItemDetails: (state, action) => {
            state.itemDetails = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.isLoading = false
            state.categories = action.payload.data.categories;
        })
        .addCase(fetchCategories.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(fetchCategoryItems.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchCategoryItems.fulfilled, (state, action) => {
            state.isLoading = false
            state.categoryItems = action.payload.data.items.data
            state.restaurantId = action?.payload?.data?.restaurant?.id;
        })
        .addCase(fetchCategoryItems.rejected, (state) => {
            state.isLoading = false;
            state.categoryItems = []
        })
    }
});

export const { setItemDetails } = categorySlice.actions;
export default categorySlice.reducer;