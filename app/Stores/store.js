import {configureStore} from '@reduxjs/toolkit'
import timelineSlice from '../features/timeline/timelineSlice';
 
// Then send the reducer to the store for buying or modifying our state from the store shop
 import Timeline from '../timeline/Timeline';
// Here we can keep multiple reducers AudioScheduledSourceNode, that is needed for the Todo Store
export const store = configureStore({
    reducer : timelineSlice, 
})