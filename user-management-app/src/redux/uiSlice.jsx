import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    addModalOpen: false,
    editModalOpen: false,
    editUser: null,
  },
  reducers: {
    openAddModal(state) { state.addModalOpen = true; },
    closeAddModal(state) { state.addModalOpen = false; },
    openEditModal(state, action) { state.editModalOpen = true; state.editUser = action.payload || null; },
    closeEditModal(state) { state.editModalOpen = false; state.editUser = null; },
  }
});

export const { openAddModal, closeAddModal, openEditModal, closeEditModal } = uiSlice.actions;
export default uiSlice.reducer;
