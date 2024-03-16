import { combineReducers, configureStore } from '@reduxjs/toolkit'

import projectHighlightsReducer from './slices/projectHighlightSlice'
import currencyReducer from './slices/currencySlice'
import colorReducer from './slices/colorSlice'

const reducers = combineReducers({
  projectHighlight: projectHighlightsReducer,
  currency: currencyReducer,
  color: colorReducer
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
