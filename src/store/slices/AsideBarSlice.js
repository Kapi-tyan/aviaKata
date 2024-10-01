import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allTransfer: false,
  withoutTransfer: false,
  oneTransfer: false,
  twoTransfer: false,
  threeTransfers: false,
  nothing: true,
};

const AsideBarCheckboxFilters = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleAllTransfer: (state) => {
      const newValue = !state.allTransfer;
      state.allTransfer = newValue;
      state.withoutTransfer = newValue;
      state.oneTransfer = newValue;
      state.twoTransfer = newValue;
      state.threeTransfers = newValue;
      state.nothing = !newValue;
    },
    toggleFilterTransfer: (state, action) => {
      const filter = action.payload;
      state[filter] = !state[filter];
      const anyTransferSelected =
        state.withoutTransfer || state.oneTransfer || state.twoTransfer || state.threeTransfers;
      if (state.allTransfer && !state[filter]) {
        state.allTransfer = false;
      }
      state.nothing = !anyTransferSelected;
    },
  },
});

export const { toggleAllTransfer, toggleFilterTransfer } = AsideBarCheckboxFilters.actions;

export default AsideBarCheckboxFilters.reducer;
