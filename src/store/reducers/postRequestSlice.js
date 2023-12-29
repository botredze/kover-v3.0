import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetBusket } from "./statesSlice";
import { chnageAlertText } from "./EditDataUser";
import {
  changeDataUser,
  changeTokenName,
  changeTokenNum,
} from "./accountSlice";

const initialState = {
  orderUser: {
    phone: "",
    fio: "",
    address: "",
    kvartira: "",
    hourDeliver: "",
    zakazDopInfo: "",
    type_oplata: 1,
    sdacha: "",
    comment_zakaz: "",
    summ: 0,
    product_list: [],
  },
  errorOrderFood: false,
  loadingOrder: false,
  goodSendOrder: false,
  checkAuth: 0,
};

// Отправка номера для регистрации
// http://kover-site.333.kg/send_code/
export const sendNumAuth = createAsyncThunk(
  "sendNumAuth",
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const response = await axios.post(
        "http://kover-site.333.kg/send_code/",
        {
          phone_client: info?.numberPhone?.replace(/[-()]/g, "")?.slice(-9), // убираю лишние символы
          session: info?.session,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 || response.status < 300) {
        dispatch(changeDataUser({ ...info, idUser: response?.data?.codeid }));
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      dispatch(
        chnageAlertText({
          text: "Нету соединения с интернетом!",
          backColor: "red",
          state: true,
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

// Подтверждение номера
// http://kover-site.333.kg/check_code/
export const checkNum = createAsyncThunk(
  "checkNum",
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const response = await axios.post(
        "http://kover-site.333.kg/check_code/",
        {
          phone_client: info?.dataUser?.numberPhone
            .replace(/[-()]/g, "")
            ?.slice(-9),
          verification_number: info?.code?.join(""),
          codeid: info?.dataUser?.idUser,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 || response.status < 300) {
        if (response?.data?.result === 1) {
          dispatch(changeTokenNum(info?.dataUser?.numberPhone));
        } else {
          dispatch(changeTokenNum(""));
          dispatch(
            chnageAlertText({
              text: "Неверный код",
              backColor: "red",
              state: true,
            })
          );
        }
        return response?.data?.result;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      dispatch(
        chnageAlertText({
          text: "Произошла ошибка!",
          backColor: "red",
          state: true,
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

// Отправка всех данных для регистрации(имени тоже)
// http://kover-site.333.kg/edit_profile/
export const authName = createAsyncThunk(
  "authName",
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const response = await axios.post(
        "http://kover-site.333.kg/edit_profile/",
        {
          codeid: info?.dataUser?.idUser,
          client_fio: info?.dataUser?.name,
          client_phone: "",
          client_phone2: "",
          address: `${info?.placeUser?.mainAdres}, ${info?.placeUser?.noMainAdres}, ${info?.placeUser?.infoDop}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 || response.status < 300) {
        if (+response?.data?.result === 1) {
          dispatch(changeTokenName(info?.dataUser?.name));
          dispatch(
            changeDataUser({
              ...info?.dataUser,
              contacts: [
                info?.placeUser?.mainAdres,
                info?.placeUser?.noMainAdres,
                info?.placeUser?.infoDop,
              ],
              name: info?.dataUser?.name,
            })
          );
        } else {
          dispatch(changeTokenName(""));
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      dispatch(
        chnageAlertText({
          text: "Ошибка! Повторите попытку позже!",
          backColor: "red",
          state: true,
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

// Отправка заказа
// http://kover-site.333.kg/create_zakaz/
export const sendOrderFoods = createAsyncThunk(
  "sendOrderFoods",
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const response = await axios.post(
        "http://kover-site.333.kg/create_zakaz/",
        info,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 || response.status < 300) {
        dispatch(resetBusket());
      } else {
        dispatch(
          chnageAlertText({
            text: "Упс! Что-то пошло не так... Повторите попытку позже!",
            backColor: "red",
            state: true,
          })
        );
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postRequestSlice = createSlice({
  name: "postRequestSlice",
  initialState,
  extraReducers: (builder) => {
    //// sendOrderFoods
    builder.addCase(sendOrderFoods.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.goodSendOrder = true;
      state.orderUser = {
        phone: "",
        fio: "",
        address: "",
        kvartira: "",
        hourDeliver: "",
        dop: "",
        type_oplata: 1,
        sdacha: "",
        comment_zakaz: "",
        summ: "",
        product_list: [],
      };
    });
    builder.addCase(sendOrderFoods.rejected, (state, action) => {
      state.error = action.payload;
      state.loadingOrder = false;
      state.errorOrderFood = true;
    });
    builder.addCase(sendOrderFoods.pending, (state, action) => {
      state.loadingOrder = true;
    });
    //// checkNum
    builder.addCase(checkNum.fulfilled, (state, action) => {
      state.loading = false;
      state.checkAuth = action.payload;
    });
    builder.addCase(checkNum.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(checkNum.pending, (state, action) => {
      state.loading = true;
    });
  },
  reducers: {
    changeOrderUser: (state, action) => {
      state.orderUser = action.payload;
    },
    changeTypeOrder: (state, action) => {
      state.orderUser = { ...state.orderUser, type_oplata: action.payload };
    },
    changeError: (state, action) => {
      state.errorOrderFood = action.payload;
    },
    changeLoading: (state, action) => {
      state.loadingOrder = action.payload;
    },
    changeGoodSent: (state, action) => {
      state.goodSendOrder = action.payload;
    },
  },
});

export const {
  changeOrderUser,
  changeTypeOrder,
  changeError,
  changeLoading,
  changeGoodSent,
} = postRequestSlice.actions;

export default postRequestSlice.reducer;
