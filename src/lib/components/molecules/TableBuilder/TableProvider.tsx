import { createContext, useContext } from 'react';
import { ITableHeader } from './types';

export type ITableContext<V> = {
  columns: ITableHeader<V>;
  rows: V[];

  idKey: string;
  //select
  showSelect?: boolean;
  selectActions?: string[];
  handleSelectAction?: (action: string, selectedItems: string[]) => void;

  //actions
  handleActions?: (action: string, id?: string, row?: V) => void;
  handleCellClick?: (key: string, value?: unknown, row?: V) => void;
  //

  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;

  sorters?: Record<string, string>;
  setSorters?: React.Dispatch<React.SetStateAction<Record<string, string>>>;

  showSearch?: boolean;
  searchTerm?: string;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
};

export const TableContext = createContext<ITableContext<any> | null>(null);

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

// React.PropsWithChildren<MyProviderProps<Item>>;
