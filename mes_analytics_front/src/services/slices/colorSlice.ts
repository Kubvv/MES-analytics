import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: { colors: string[] } = {
  colors: []
}

const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    electionLoaded (state, action: PayloadAction<string[]>) {
      return {
        ...state,
        colors: action.payload
      }
    }
  }
})

export const { electionLoaded } = colorSlice.actions

export default colorSlice.reducer
