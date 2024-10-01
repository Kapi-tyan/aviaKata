import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fastest: true,
  cheapest: false,
};

const TicketsButtonSlice = createSlice({
  name: 'ticketsButton',
  initialState,
  reducers: {
    activeButton: (state, action) => {
      if (action.payload === 'cheapest') {
        state.cheapest = true;
        state.fastest = false;
      } else if (action.payload === 'fastest') {
        state.cheapest = false;
        state.fastest = true;
      }
    },
  },
});

export const { activeButton } = TicketsButtonSlice.actions;
export default TicketsButtonSlice.reducer;
