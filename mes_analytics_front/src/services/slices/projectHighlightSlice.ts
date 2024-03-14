import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: { highlights: string[] } = {
  highlights: []
}

const projectHighlightSlice = createSlice({
  name: 'projectHighlights',
  initialState,
  reducers: {
    projectHovered (state, action: PayloadAction<string[]>) {
      return {
        ...state,
        highlights: action.payload
      }
    },
    projectUnHovered (state) {
      return {
        ...state,
        highlights: []
      }
    }
  }
})

export const { projectHovered, projectUnHovered } = projectHighlightSlice.actions

export default projectHighlightSlice.reducer
