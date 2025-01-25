import { createSlice , PayloadAction} from "@reduxjs/toolkit";

const PropertyInformationSlice = createSlice({
    name: 'propertyInformation',
    initialState:{
        address: {
            name: "",
            lat: 0,
            lng: 0,
        },
        neighborhood:{
            name: "",
            lat: 0,
            lng: 0,
        }
    },
    reducers: {
        setAddress: (state, action: PayloadAction<{lat: number, lng: number, name: string}>) => {
            state.address.lat = action.payload.lat;
            state.address.lng = action.payload.lng;
            state.address.name = action.payload.name;
        },
        setNeighborhood: (state, action: PayloadAction<{lat: number, lng: number, name: string}>) => {
            state.neighborhood.lat = action.payload.lat;
            state.neighborhood.lng = action.payload.lng;
            state.neighborhood.name = action.payload.name;
        },
      
    }
})

export const {setAddress, setNeighborhood} = PropertyInformationSlice.actions;
export default PropertyInformationSlice.reducer;