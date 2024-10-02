import { configureStore } from '@reduxjs/toolkit';

import { logger } from '../middleware/logger';

import AsideBacheckboxFilters from './slices/AsideBarSlice';
import TicketsButtonSlice from './slices/TicketsButtonSlice';
import GetTickets from './slices/GetTicketsSlice';

export const store = configureStore({
  reducer: {
    filters: AsideBacheckboxFilters,
    ticketsButton: TicketsButtonSlice,
    tickets: GetTickets,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
