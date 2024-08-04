import { configureStore, combineReducers } from '@reduxjs/toolkit';
import timelineSlice from '../features/timeline/timelineSlice';

// Then send the reducer to the store for buying or modifying our state from the store shop
 import Timeline from '../Timeline/timeline';
// Single Reducer, Here we can keep multiple reducers AudioScheduledSourceNode, that is needed for the Todo Store
// export const store = configureStore({
//     reducer : timelineSlice, 
// })

// Combine multiple reducers
const rootReducer = combineReducers({
    timeline: timelineSlice,
    // someOther: someOtherSlice, // Add more reducers here
  });
  
  // Configure the store with the combined reducers
  export const store = configureStore({
    reducer: rootReducer,
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;