import { createAsyncThunk } from '@reduxjs/toolkit';

import { addTickets, clearError, setError } from '../store/slices/GetTicketsSlice';

const idUrl = 'https://aviasales-test-api.kata.academy/search';
const ticketsUrl = 'https://aviasales-test-api.kata.academy/tickets';

export const getSearchId = createAsyncThunk('GetTickets/getSearchId', async (_, { dispatch, getState }) => {
  const { searchId } = getState().tickets;
  if (searchId) {
    dispatch(getTickets(searchId));
    return searchId;
  }
  const response = await fetch(idUrl);
  const data = await response.json();
  dispatch(getTickets(data.searchId));
  return data.searchId;
});

export const getTickets = createAsyncThunk('GetTickets/getTickets', async (searchId, { dispatch, getState }) => {
  if (!searchId) {
    dispatch(setError(true));
    throw new Error('ID отсутствует');
  }
  let stopFlag = false;
  while (!stopFlag) {
    const { error } = getState().tickets;
    try {
      const response = await fetch(`${ticketsUrl}?searchId=${searchId}`);
      if (error) {
        dispatch(setError(true));
        break;
      }
      if (!response.ok) {
        if (response.status >= 500 && response.status < 600) {
          //console.log('Серверная ошибка');
          continue;
        }
        stopFlag = true;
        dispatch(setError(true));
        throw new Error(`Ошибка при получении билетов: ${response.statusText}`);
      }
      const data = await response.json();
      dispatch(addTickets(data.tickets));
      if (data.stop) {
        stopFlag = true;
        dispatch(clearError());
      }
    } catch (error) {
      dispatch(setError(true));
      break;
    }
  }
});
