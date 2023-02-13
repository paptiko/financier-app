import React from 'react';

interface CurrencyRowProps {
  currencyOptions: string[];
  selectedCurrency: string;
  amount: number | string;
  onChangeAmount?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CurrencyRow: React.FC<CurrencyRowProps> = ({
  currencyOptions,
  selectedCurrency,
  amount,
  onChangeAmount,
  onChangeCurrency,
}) => {
  return (
    <div className="currency__row">
      {onChangeAmount ? (
        <input type="number" value={amount} onChange={onChangeAmount} />
      ) : (
        <input type="number" value={amount} disabled />
      )}
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyRow;
