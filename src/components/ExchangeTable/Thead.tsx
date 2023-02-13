import React, { useState } from 'react';

type TheadProps = {
  columns: Array<{
    label: string;
    accessor: string;
  }>;
  handleSorting: (accessor: string, sortOrder: string) => void;
};

const Thead: React.FC<TheadProps> = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSortingChange = (accessor: string) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor }) => {
          return (
            <th key={accessor} onClick={() => handleSortingChange(accessor)}>
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default Thead;
