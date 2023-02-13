import { configureStore } from "@reduxjs/toolkit";
import { exchangeApi } from './../services/exchangeApi';


const store = configureStore({
    reducer: {
      [exchangeApi.reducerPath]: exchangeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exchangeApi.middleware),
  });
  export default store;