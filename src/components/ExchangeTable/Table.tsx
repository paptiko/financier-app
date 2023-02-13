import React, { useState, useEffect } from 'react';
import { useLazyGetLatestExchangeQuery } from '../../services/exchangeApi';
import Tbody from './Tbody';
import Thead from './Thead';
import './Table.scss';
import Loader from '../Loader/Loader';

const columns = [
  { label: 'Symbols', accessor: 'symbols' },
  { label: 'Rates', accessor: 'rates' },
];

const getCurrentValue = () => {
  const today: Date | string = new Date();
  let dd: number | string = today.getDate();
  let mm: number | string = today.getMonth() + 1;
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }
  return yyyy + '-' + mm + '-' + dd;
};

export const Table = () => {
  const [baseSymbol, setBaseSymbol] = useState('AMD');
  const [dateValue, setDateValue] = useState(getCurrentValue);
  const [tableData, setTableData] = useState<{ [k: string]: number }>({});

  const [changeSymbol, { data, isLoading, isFetching, isError }] = useLazyGetLatestExchangeQuery();

  useEffect(() => {
    if (data) {
      setTableData(data.rates);
    }
  }, [data]);

  useEffect(() => {
    if (!dateValue) return;
    changeSymbol({
      dateValue,
      baseSymbol,
    });
  }, [baseSymbol, dateValue, changeSymbol]);

  const onSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseSymbol(e.target.value);
  };

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
  };

  const handleSorting = (sortField: string, sortOrder: string) => {
    const sortedArray = Object.entries(tableData).sort((a, b) => {
      if (sortField === 'symbols') {
        return sortOrder === 'asc' ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0]);
      } else if (sortField === 'rates') {
        return sortOrder === 'asc' ? a[1] - b[1] : b[1] - a[1];
      }
      return 0;
    });

    const sortedObj = Object.fromEntries(sortedArray);
    setTableData(sortedObj);
  };

  return (
    <>
      {!isLoading ? (
        <div className="table__container">
          <div className="filters">
            <select className="symbolFilter" onChange={onSymbolChange} value={baseSymbol}>
              {Object.keys(data?.rates || {}).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input className="dateFilter" type="date" onChange={onDateChange} value={dateValue} />
            {isFetching && <Loader />}
          </div>
          {isError && <p className="error">Something went wrong!</p>}

          <div className="table__wrapper">
            <table>
              <Thead columns={columns} handleSorting={handleSorting} />
              <Tbody
                baseSymbol={baseSymbol}
                tableData={tableData}
                onChangeSymbol={(symbol) => setBaseSymbol(symbol)}
              />
            </table>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
