import React from 'react';
import Converter from '../components/CurrencyConverter/Converter';
import { Table as ExchangeTable } from '../components/ExchangeTable/Table';
import './App.scss';

const App = () => {
  return (
    <div className="container">
      <Converter />
      <ExchangeTable />
    </div>
  );
};

export default App;
