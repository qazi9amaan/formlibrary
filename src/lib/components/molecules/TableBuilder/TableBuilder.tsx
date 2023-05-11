import { TableBody } from './TableBody';
import { IPaginationProps, Pagination } from './Layout/Pagination';
import { TableHeader } from './TableHeader';
import { ITableHeader } from './types';
import { useMemo, useState } from 'react';
import { ITableContext, TableContext } from './TableProvider';
import { memo } from 'react';
import get from 'lodash/get';

export type ITableProps<V> = {
  header: ITableHeader<V> | any;
  data: V[];

  idKey?: string;

  //search
  showSearch?: boolean;

  //select
  showSelect?: boolean;
  selectActions?: string[];

  handleSelectAction?: (action: string, selectedItems: string[]) => void;
  handleActions?: (action: string, id?: string, row?: V) => void;
  handleCellClick?: (key: string, value?: unknown, row?: V) => void;

  //
  pagination?: IPaginationProps;
};

const TableBuilder = <T = any,>(props: ITableProps<T>) => {
  //
  const {
    pagination,
    header: columns,
    idKey = 'id',
    data: rows,
    showSelect,
    handleActions,
    handleCellClick,
    selectActions,
    handleSelectAction,
    showSearch,
  } = props;

  //states
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sorters, setSorters] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Sorting
  const sortedRows = useMemo(() => {
    let sortableRows = [...rows];

    // Apply search filter
    if (searchTerm) {
      sortableRows = sortableRows.filter((row: T) =>
        Object?.values(row as object).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }

    // apply each sorter in sequence
    Object.keys(sorters).forEach((colKey) => {
      const direction = sorters[colKey];

      sortableRows.sort((a, b) => {
        const aValue = get(a, colKey);
        const bValue = get(b, colKey);

        // if values are numbers, sort numerically
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return direction === 'asc' ? aValue - bValue : bValue - aValue;
        }

        // otherwise, sort lexicographically
        const aString = String(aValue);
        const bString = String(bValue);

        return direction === 'asc'
          ? aString.localeCompare(bString)
          : bString.localeCompare(aString);
      });
    });

    return sortableRows;
  }, [rows, sorters, searchTerm]);

  //
  const contextValues = useMemo<ITableContext<T>>(
    () => ({
      idKey,
      columns,
      sorters,
      showSelect,
      showSearch,
      searchTerm,
      selectActions,
      selectedItems,
      rows: sortedRows,
      setSelectedItems,
      handleSelectAction,
      handleActions,
      handleCellClick,
      setSearchTerm,
      setSorters,
    }),
    [
      //
      showSelect,
      selectedItems,
      selectActions,
      handleSelectAction,
      //
      idKey,
      columns,
      sorters,
      sortedRows,
      //
      handleActions,
      handleCellClick,
      //
      searchTerm,
      showSearch,
    ],
  );

  return (
    <TableContext.Provider value={contextValues}>
      <div className=' min-h-[100px] min-w-full max-w-full  bg-white pb-4 overflow-x-auto shadow rounded-lg scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar transition-all ease-in-out duration-500'>
        <table className='text-sm table-auto  min-w-full  '>
          <TableHeader />
          <TableBody />
        </table>
      </div>
      {pagination && <Pagination {...pagination} />}
    </TableContext.Provider>
  );
};

export const Table = memo(TableBuilder) as typeof TableBuilder;
