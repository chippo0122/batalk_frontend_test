import { configureStore } from '@reduxjs/toolkit'
import tagsReducer from './tags'
import questionListReducer from './questionList'
import loadingStatusReducer from './loadingStatus'

export default configureStore({
    reducer: {
        questionList: questionListReducer,
        tags: tagsReducer,
        isLoading: loadingStatusReducer
    }
})