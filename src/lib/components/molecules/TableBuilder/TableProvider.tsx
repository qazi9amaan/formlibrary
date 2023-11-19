import React, { useMemo, useState } from 'react';
import get from 'lodash/get';
import { createContext, useContext } from 'react';
import { ITableCellHeader, ITableHeader } from './types';
import { ITableProps } from './TableBuilder';
import { DateRangeValue } from './Layout/FilterBox';

export type ITableContext<V> = {
  rows: V[];

  idKey: string;

  //select
  showSelect?: boolean;
  selectActions?: string[];
  handleSelectAction?: (action: string, selectedItems: string[]) => void;

  //actions
  handleActions?: (action: string, id?: string, row?: V) => void;
  handleCellClick?: (key: string, value?: unknown, row?: V) => void;

  //selected
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;

  sorters?: Record<string, string>;
  setSorters?: React.Dispatch<React.SetStateAction<Record<string, string>>>;

  showSearch?: boolean;

  //columns
  columns: ITableHeader<V>;
  setColumns: React.Dispatch<React.SetStateAction<ITableHeader<V>>>;

  //
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;

  showDateRange?: boolean;
  dateRange?: DateRangeValue;
  onDateRangeChange?: (dates: DateRangeValue) => void;
};

export const TableContext = createContext<ITableContext<any> | null>(null);

type SortDirection = 'asc' | 'desc';

const sortByKey = (a: any, b: any, key: string, direction: SortDirection) => {
  const aValue = get(a, key);
  const bValue = get(b, key);

  // If values are numbers, sort numerically
  if (typeof aValue === 'number' && typeof bValue === 'number') {
    return direction === 'asc' ? aValue - bValue : bValue - aValue;
  }

  // Otherwise, sort lexicographically
  const aString = String(aValue);
  const bString = String(bValue);

  return direction === 'asc' ? aString.localeCompare(bString) : bString.localeCompare(aString);
};

export const TableProvider = <V = unknown,>(
  props: ITableProps<V> & { children: React.ReactNode },
) => {
  //
  const {
    header,
    idKey = 'id',
    data: rows,
    showSelect,
    handleActions,
    handleCellClick,
    selectActions,
    handleSelectAction,
    showSearch,

    dateRange,
    onDateRangeChange,
  } = props;

  const headerObject = useMemo(() => {
    return header?.reduce((acc, item) => {
      if (item?.type !== 'actions') {
        acc[item?.key as string] = item;
      }
      return acc;
    }, {} as Record<string, ITableCellHeader<V>>);
  }, [header]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sorters, setSorters] = useState<Record<string, string>>({});
  const [columns, setColumns] = useState(header?.filter((item) => !item?.hidden));
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Sorting
  const sortedRows = useMemo(() => {
    let sortableRows = [...rows];

    // Apply search filter
    if (searchTerm) {
      sortableRows = sortableRows.filter((row: V) => {
        return Object?.entries(row as object).some(([key, value]) => {
          const extract = headerObject?.[key]?.extract?.(row);
          const result = extract ? extract : value;
          return String(result || '')
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        });
      });
    }

    Object.keys(sorters).forEach((colKey) => {
      const direction = sorters[colKey] as SortDirection;
      sortableRows.sort((a, b) => sortByKey(a, b, colKey, direction));
    });

    return sortableRows;
  }, [rows, sorters, searchTerm, headerObject]);

  return (
    <TableContext.Provider
      value={{
        idKey,

        showSelect,
        showSearch,

        selectedItems,
        rows: sortedRows,

        //actions
        selectActions,
        setSelectedItems,
        handleSelectAction,
        handleActions,
        handleCellClick,

        //sorters
        sorters,
        setSorters,

        //columns
        columns,
        setColumns,

        //search
        setSearchTerm,

        //dateRange
        dateRange,
        onDateRangeChange,
        showDateRange: !!onDateRangeChange,
      }}
    >
      {/*  */}
      {props.children}
    </TableContext.Provider>
  );
};

// create a hook
export const useTableContext = <V,>() => {
  const context = useContext<ITableContext<V>>(
    TableContext as unknown as React.Context<ITableContext<V>>,
  );
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};
