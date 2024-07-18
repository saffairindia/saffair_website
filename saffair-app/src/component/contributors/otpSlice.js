import { createSlice } from '@reduxjs/toolkit';

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    phoneNumber: '',
    user: null,
    stateFlag: true,  // Example state flag
  },
  reducers: {
    addPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    addUser: (state, action) => {
      state.user = action.payload;
    },
    changeStateFalse: (state) => {
      state.stateFlag = false;
    },
  },
});

export const { addPhoneNumber, addUser, changeStateFalse } = otpSlice.actions;
export default otpSlice.reducer;
