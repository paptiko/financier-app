import React from 'react';

type TbodyProps = {
  baseSymbol: string;
  tableData: { [key: string]: number };
  onChangeSymbol: (symbol: string) => void;
};

const Tbody: React.FC<TbodyProps> = ({ baseSymbol, tableData, onChangeSymbol }) => {
  return (
    <tbody>
      {Object.entries(tableData).map((data) => (
        <tr
          key={data[0]}
          onClick={() => onChangeSymbol(data[0])}
          className={baseSymbol === data[0] ? 'selected' : ''}>
          <th>{data[0]}</th>
          <th>{data[1]}</th>
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
