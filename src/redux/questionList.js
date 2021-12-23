import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Axios from 'axios'
import { MAIN_URL, QUESTIONS_PATH } from "../assets/API"

const init = {
    items: [],
    hasmore: false,
    currentPage: 1
};

export const requestQuestionList = createAsyncThunk(
    'questionListSlice/requestQuestionList',
    async (obj) => {
        const {tags, page, callByScroll} = obj;
        const url = `${MAIN_URL}${QUESTIONS_PATH}&page=${page}${tags ? `&tagged=${tags}` : ''}`;
        const res = await Axios.get(url);
        return {
            items: res.data.items,
            hasmore: res.data.has_more,
            callByScroll: callByScroll
        }
    }
)

export const questionListSlice = createSlice({
    name: 'questionListSlice',
    initialState: init,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(requestQuestionList.fulfilled, (state, action) => {
                const {items, hasmore, callByScroll} = action.payload;
                if(callByScroll) {
                    state.items = [...state.items, ...items];
                    state.hasmore = hasmore;
                    state.currentPage++
                } else {
                    state.items = items;
                    state.hasmore = hasmore
                    state.currentPage = 1;
                }
            })
            .addCase(requestQuestionList.rejected, (state, aciton) => {
                alert('Request Fail');
                return init;
            })
    }
})

export default questionListSlice.reducer