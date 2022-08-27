import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    usersDetails: [],
    productsDetails : [],
    ordersDetails : [],
    widgetDetails : {
        numOfUsers : 0,
        numOfOrders : 0,
        earning : 0,
    },
    isFetching: false,
    error: false,
  },
  reducers: {
    startFetching: (state) => {
      state.isFetching = true;
    },
    usersDetailsfetchingSuccess: (state, action) => {
      state.isFetching = false;
      state.usersDetails = action.payload;
    },
    ordersDetailsfetchingSuccess: (state, action) => {
        state.isFetching = false;
        state.ordersDetails = action.payload;
    },
    widgetfetchingSuccess: (state, action) => {
        state.isFetching = false;
        state.widgetDetails = action.payload;
    },
    productDetailsfetchingSuccess: (state, action) => {
        state.isFetching = false;
        state.productsDetails=action.payload;
    },
    fetchingFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { startFetching, fetchingFailure, widgetfetchingSuccess, productDetailsfetchingSuccess, ordersDetailsfetchingSuccess, usersDetailsfetchingSuccess   } = adminSlice.actions;
export default adminSlice.reducer;