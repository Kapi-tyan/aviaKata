import { createAsyncThunk } from '@reduxjs/toolkit';

import { addTickets } from '../store/slices/GetTicketsSlice';

const idUrl = 'https://aviasales-test-api.kata.academy/search';
const ticketsUrl = 'https://aviasales-test-api.kata.academy/tickets';

export const getSearchId = createAsyncThunk('GetTickets/getSearchId', async () => {
  const response = await fetch(idUrl);
  const data = await response.json();
  return data.searchId;
});

export const getTickets = createAsyncThunk('GetTickets/getTickets', async (id, { dispatch }) => {
  let stopFlag = false;
  while (!stopFlag) {
    try {
      const response = await fetch(`${ticketsUrl}?searchId=${id}`);
      if (!response.ok) {
        dispatch(addTickets(response));
      }
      const data = await response.json();
      dispatch(addTickets(data.tickets));
      if (data.stop) {
        stopFlag = true;
      }
    } catch (error) {
      dispatch(addTickets(error));
    }
  }
});
