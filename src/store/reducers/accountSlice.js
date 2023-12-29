import { createSlice } from '@reduxjs/toolkit';

export const initialStateAll = {
  tokenNum: '',
  tokenName: '',
  dataUser: {
    name: '',
    numberPhone: '',
    placeUser: '',
    session: 0,
    contacts: [], // {message:whatsApp,num:996700754454}
    idUser: 0,
  },
};

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState: initialStateAll,
  reducers: {
    changeDataUser: (state, action) => {
      state.dataUser = action.payload;
    },
    addSession: (state, action) => {
      state.dataUser = {
        ...state.dataUser,
        session: action.payload,
      };
    },
    changeTokenNum: (state, action) => {
      state.tokenNum = action.payload;
    },
    changeTokenName: (state, action) => {
      state.tokenName = action.payload;
    },
  },
});

export const { changeDataUser, addSession, changeTokenNum, changeTokenName } =
  accountSlice.actions;

export default accountSlice.reducer;
