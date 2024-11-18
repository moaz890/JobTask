import axios from "axios";

import { createSlice, createAsyncThunk }from "@reduxjs/toolkit";

export const createItem = createAsyncThunk("item/createItem", async (formData) => {
    const response = await axios.post(`http://localhost:3000/api/item/create-item`, formData, {
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response?.data;
})


export const updateItem = createAsyncThunk("/item/updateItem", async ({id, formData}) => {
    const response = await axios.put(`http://localhost:3000/api/item/update-item/${id}`, formData, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response?.data;
});

export const fetchItems = createAsyncThunk("item/fetchItems", async () => {
    const response = await axios.get(`http://localhost:3000/api/item/fetch-items`);
    return response?.data;
})

export const deleteItem = createAsyncThunk("item/deleteItem", async (id) => {
    const response = await axios.delete(`http://localhost:3000/api/item/delete-item/${id}`);

    return response.data;
})


const itemsSlice = createSlice({
    name: 'item',
    initialState: {
        items: [],
        isLoading: false,
        itemDetails: null,
    }, 
    reducers: {
        setItemDetails: (state, action) => {
            state.itemDetails = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload.data;
        }).addCase(fetchItems.rejected, (state) => {
            state.isLoading = false;
            state.items = [];
        })
    }

})

export const { setItemDetails } = itemsSlice.actions;
export default itemsSlice.reducer;