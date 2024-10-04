import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latitude: 37.8087,
  longitude: -122.4098,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updateLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { updateLocation } = locationSlice.actions;
export default locationSlice.reducer;
