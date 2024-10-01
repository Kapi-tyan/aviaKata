import { createSlice } from '@reduxjs/toolkit';

import { getSearchId, getTickets } from '../../services/aviaServ';

const initialState = {
  searchId: null,
  tickets: [],
  loading: false,
  error: null,
  stop: false,
};

const GetTicketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTickets: (state, action) => {
      state.tickets = [...state.tickets, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
        state.loading = false;
      })
      .addCase(getSearchId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTickets.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTickets } = GetTicketsSlice.actions;

export default GetTicketsSlice.reducer;
