import React, { useState, useEffect } from 'react';
import { useGetExchangeSymbolsQuery, useLazyConvertFromToQuery } from '../../services/exchangeApi';
import CurrencyRow from './CurrencyRow';
import './Converter.scss';
import useDebounce from '../../hooks/useDebounce';
import Loader from '../Loader/Loader';

const Converter = () => {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState<string>('1');
  const debouncedAmount = useDebounce(amount, 500);

  const { data: symbolsData, isLoading: isLoadingSymbols } = useGetExchangeSymbolsQuery();

  const [
    convertFromTo,
    { data: convertData, isLoading: isLoadingConvert, isFetching: isFetchingConvertResult },
  ] = useLazyConvertFromToQuery();

  useEffect(() => {
    if (symbolsData) {
      const symbols = Object.keys(symbolsData.symbols);
      setCurrencyOptions(symbols);
      setFromCurrency(symbols[0]);
      setToCurrency(symbols[1]);
    }
  }, [symbolsData]);

  useEffect(() => {
    if (fromCurrency && toCurrency && debouncedAmount) {
      convertFromTo({
        amount: debouncedAmount,
        from: fromCurrency,
        to: toCurrency,
      });
    }
  }, [fromCurrency, toCurrency, debouncedAmount, convertFromTo]);

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value);
  }

  return (
    <>
      {!isLoadingSymbols && !isLoadingConvert ? (
        <div className="converter">
          {!isFetchingConvertResult ? <h1>Currency Converter</h1> : <Loader />}
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            amount={amount}
            onChangeAmount={handleAmountChange}
          />

          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
            amount={convertData?.result || 0}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Converter;
