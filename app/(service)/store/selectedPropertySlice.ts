import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SelectedPropertyState {
  selectedProperty: string | null;
}

const initialState: SelectedPropertyState = {
  selectedProperty: null,
}

const selectedPropertySlice = createSlice({
  name: 'selectedProperty',
  initialState,
  reducers: {
    setSelectedProperty(state, action: PayloadAction<string>) {
      state.selectedProperty = action.payload
    },
    clearSelectedProperty(state) {
      state.selectedProperty = null
    },
  },
})

export const { setSelectedProperty, clearSelectedProperty } = selectedPropertySlice.actions
export default selectedPropertySlice.reducer 