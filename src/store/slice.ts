import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Preferences {
  theme: string;
  language: string;
}

export interface AccountState {
  _id: string;
  username: string;
  email: string;
  verified: boolean;
  profilePhotoUrl: string;
  authMethod: string;
  preferences: Preferences;
  plan: string;
  createdAt: string;
  updatedAt: string;
  notes: any[];
  todos: any[];
  calendars: any[];
  trees: any[];
}

const initialState: AccountState = {
  _id: '',
  username: '',
  email: '',
  verified: false,
  profilePhotoUrl: '',
  authMethod: '',
  preferences: {
    theme: 'light',
    language: 'en',
  },
  plan: 'Free Plan',
  createdAt: '',
  updatedAt: '',
  notes: [],
  todos: [],
  calendars: [],
  trees: [],
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateAccountState: (state, action: PayloadAction<AccountState>) => {
      return { ...state, ...action.payload };
    },
    updatePreferences: (state, action: PayloadAction<Preferences>) => {
      state.preferences = action.payload;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { updateAccountState, updatePreferences, logout } = accountSlice.actions;

export default accountSlice.reducer;
