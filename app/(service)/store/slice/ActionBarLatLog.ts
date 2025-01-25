import { createSlice , PayloadAction} from "@reduxjs/toolkit";

const ActionBarLatLogSlice = createSlice({
    name: 'actionBarLatLog',
    initialState: {
        lat: 0,
        lng: 0,
    },
    reducers: {
        setLatLog: (state, action: PayloadAction<{lat: number, lng: number}>) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        }
    }
})

export const {setLatLog} = ActionBarLatLogSlice.actions;
export default ActionBarLatLogSlice.reducer;

