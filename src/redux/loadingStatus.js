import { createSlice } from "@reduxjs/toolkit"

export const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState: false,
    reducers: {
        setLoadingStatus: (state, action) => {
            const {payload} = action;
            return payload
        }
    }
})

export const {setLoadingStatus} = loadingSlice.actions;

export default loadingSlice.reducer