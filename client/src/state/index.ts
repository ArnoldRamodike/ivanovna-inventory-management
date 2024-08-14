import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface InitialStateTypes{
    isSidebarCollapsed: boolean;
    isDarkmode: boolean;
}

const initialState: InitialStateTypes = {
    isSidebarCollapsed: false,
    isDarkmode: false,
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean> ) =>{
            state.isSidebarCollapsed = action.payload;
        },
        
        setIsDarkmode: (state, action: PayloadAction<boolean> ) =>{
            state.isDarkmode = action.payload;
        },

    }
});

export const {setIsDarkmode, setIsSidebarCollapsed} = globalSlice.actions;

export default globalSlice.reducer;