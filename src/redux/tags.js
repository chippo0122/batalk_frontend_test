import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

import { MAIN_URL, TAGS_PATH } from '../assets/API';

const init = {
    items: [],
    currentTag: ''
};

export const requestTags = createAsyncThunk(
    'tagsSlice/requestTags',
    async (inname) => {
        const url = `${MAIN_URL}${TAGS_PATH}${inname ? `&inname=${inname}` : ''}`;
        const res = await Axios.get(url);
        return {
            items: res.data.items,
            currentTag: inname
        };
    }
)

export const tagSlice = createSlice({
    name: 'tagSlice',
    initialState: init,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(requestTags.fulfilled, (state, action) => {
            const {items, currentTag} = action.payload;
            state.items = items;
            state.currentTag = currentTag;
        })
        .addCase(requestTags.rejected, (state, action) => {
            alert('Request Fail');
            return init
        })
    }
})

export default tagSlice.reducer