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
        },
        name: "",
        price: 0,
        description: "",
        propertyType: "",
        bedrooms: 0,
        bathrooms: 0,
        squareFeet: 0,
        images: "",
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
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setPrice: (state, action: PayloadAction<number>) => {
            state.price = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setPropertyType: (state, action: PayloadAction<string>) => {
            state.propertyType = action.payload;
        },
        setBedrooms: (state, action: PayloadAction<number>) => {
            state.bedrooms = action.payload;
        },
        setBathrooms: (state, action: PayloadAction<number>) => {
            state.bathrooms = action.payload;
        },  
        setSquareFeet: (state, action: PayloadAction<number>) => {
            state.squareFeet = action.payload;
        },
        setImages: (state, action: PayloadAction<string>) => {
            state.images = action.payload;
        },
    }
})

export const {setAddress, setNeighborhood,  setName, setPrice, setDescription, setPropertyType, setBedrooms, setBathrooms, setSquareFeet, setImages} = PropertyInformationSlice.actions;
export default PropertyInformationSlice.reducer;