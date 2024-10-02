import { createSlice } from '@reduxjs/toolkit';

import { getSearchId, getTickets } from '../../services/aviaServ';

const initialState = {
  searchId: null,
  tickets: [],
  loading: false,
  error: false,
  stop: false,
};

const GetTicketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTickets: (state, action) => {
      state.tickets = [...state.tickets, ...action.payload];
    },
    clearError: (state) => {
      state.error = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
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
      .addCase(getSearchId.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getTickets.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.stop = true;
      })
      .addCase(getTickets.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { addTickets, clearError, setError } = GetTicketsSlice.actions;

export default GetTicketsSlice.reducer;
