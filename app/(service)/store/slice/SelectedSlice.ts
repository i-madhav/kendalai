import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { PropertyData } from "@/app/(platform)/home/page";

interface Location {
    id: string;
    name: string;
    type: LocationType;
    lat: number;
    lng: number;
  }
  
  type PropertyType = "VILLA" | "COMMERCIAL" | "APARTMENT" | "HOUSE" | "LAND";
  
  type LocationType = "ADDRESS" | "NEIGHBORHOOD" | "CITY" | "STATE";

const initialState: {selectedP: PropertyData | null} = {
    selectedP: null,
}

const selectedSlice = createSlice({
    name: "selected",
    initialState,
    reducers: {
        setSelectedProperty: (state, action: PayloadAction<PropertyData>) => {
            state.selectedP = action.payload;
        },
    },
}); 

export const { setSelectedProperty } = selectedSlice.actions;
export default selectedSlice.reducer;
