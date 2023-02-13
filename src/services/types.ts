export interface ExchangeSymbolsResponse {
  success: boolean;
  symbols: { [key: string]: string };
}

export interface ConvertFromToResponse {
  date: Date;
  info: {
    rate: number;
    timestamp: number;
  };
  query: {
    amount: number;
    from: string;
    to: string;
  };
  result: number;
  success: boolean;
}

export interface LatestExchangeResponse {
  base: string;
  date: Date;
  rates: { [key: string]: number };
}
