import { combineReducers, configureStore } from '@reduxjs/toolkit'

import projectHighlightsReducer from './slices/projectHighlightSlice'
import currencyReducer from './slices/currencySlice'

const reducers = combineReducers({
  projectHighlight: projectHighlightsReducer,
  currency: currencyReducer
})

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
