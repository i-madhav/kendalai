import {configureStore} from '@reduxjs/toolkit'
import ActionBarLatLogSlice from './slice/ActionBarLatLog';
import PropertyInformationSlice from './slice/PropertyInformation';
import SelectedSlice from './slice/SelectedSlice';
export const store = configureStore({
    reducer: {
        actionBarLatLog: ActionBarLatLogSlice,
        propertyInformation: PropertyInformationSlice,
        selectedProperty: SelectedSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
