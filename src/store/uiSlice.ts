import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
  loading: boolean;
}

const initialState: UiState = {
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    showLoading(state) {
      state.loading = true;
    },
    hideLoading(state) {
      state.loading = false;
    },
  },
});

export const { setLoading, showLoading, hideLoading } = uiSlice.actions;
export default uiSlice.reducer;
