import { TableBody } from './TableBody';
import { IPaginationProps, Pagination } from './Layout/Pagination';
import { TableHeader } from './TableHeader';
import { ITableHeader } from './types';
import { TableProvider } from './TableProvider';
import { memo } from 'react';

export type ITableProps<V = unknown> = {
  header: ITableHeader<V>;
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

const TableBuilder = <V = unknown,>(props: ITableProps<V>) => {
  //
  const { pagination } = props;

  return (
    <TableProvider<V> {...props}>
      <div
        className='
        min-h-[400px] min-w-full max-w-full 
        bg-white pb-4 overflow-x-auto shadow rounded-lg 
        scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar 
        transition-all ease-in-out duration-500'
      >
        <table className='text-sm table-auto  min-w-full  '>
          <TableHeader />
          <TableBody />
        </table>
      </div>
      {pagination && <Pagination {...pagination} />}
    </TableProvider>
  );
};

export const Table = memo(TableBuilder) as typeof TableBuilder;
