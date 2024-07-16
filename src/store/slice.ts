import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AccountState {
  email: string;
  image: string;
}

const initialState: AccountState = {
    email: '',
    image: ''
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateAccountState: (state, action: PayloadAction<AccountState>) => {
        state.email = action.payload.email;
        state.image = action.payload.image;
    },
    logout: (state) => {
      state.email = '';
      state.image = '';
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateAccountState,logout } = accountSlice.actions

export default accountSlice.reducer