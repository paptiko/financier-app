import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ExchangeSymbolsResponse, ConvertFromToResponse, LatestExchangeResponse } from './types';

const exchangeApiHeaders = {
  apikey: 'N1UeVzfkFOvW55KtIvpDbO1J7KmKz3d2',
};

const baseUrl = 'https://api.apilayer.com/exchangerates_data/';

const createRequest = (url: string) => ({
  url,
  headers: exchangeApiHeaders,
});

export const exchangeApi = createApi({
  reducerPath: 'exchangeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchangeSymbols: builder.query<ExchangeSymbolsResponse, void>({
      query: () => createRequest(`symbols`),
    }),
    convertFromTo: builder.query<ConvertFromToResponse, { [key: string]: string }>({
      query: ({ to, from, amount }) =>
        createRequest(`convert?to=${to}&from=${from}&amount=${amount}`),
    }),
    getLatestExchange: builder.query<LatestExchangeResponse, { [key: string]: string }>({
      query: ({ dateValue, baseSymbol }) => createRequest(`${dateValue}?&base=${baseSymbol}`),
    }),
  }),
});

export const {
  useGetExchangeSymbolsQuery,
  useLazyConvertFromToQuery,
  useLazyGetLatestExchangeQuery,
} = exchangeApi;
