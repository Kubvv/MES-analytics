import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Currency } from '../../interfaces/types'

const initialState: { currency: Currency } = {
  currency: 'zł'
}

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    changeCurrency (state, action: PayloadAction<Currency>) {
      return {
        ...state,
        currency: action.payload
      }
    }
  }
})

export const { changeCurrency } = currencySlice.actions

export default currencySlice.reducer
