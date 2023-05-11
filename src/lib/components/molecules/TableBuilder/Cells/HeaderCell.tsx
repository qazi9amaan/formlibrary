/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTableContext } from '../TableProvider';
import { ITableCellHeader } from '../types';

const TableHeaderCell = (props: ITableCellHeader & { colKey: string }) => {
  //
  const { label, sortable, colKey } = props;
  const { sorters, setSorters } = useTableContext();

  const isSorted = sorters?.[colKey] !== undefined && sorters?.[colKey] !== null;

  const handleSort = () => {
    if (!sortable) return;
    setSorters?.((prev) => {
      const { [colKey]: _, ...rest } = prev;
      if (!isSorted) return { ...rest, [colKey]: 'asc' };
      return rest;
    });
  };

  const toggleSort = (e: any) => {
    e.stopPropagation();
    if (!sortable || !isSorted) return;
    setSorters?.((prev) => {
      if (prev?.[colKey] === 'asc') return { ...prev, [colKey]: 'desc' };
      if (prev?.[colKey] === 'desc') return { ...prev, [colKey]: 'asc' };
      return { ...prev, [colKey]: 'asc' };
    });
  };

  return (
    <td className={`whitespace-nowrap px-4 py-3 text-left font-medium text-gray-900 `}>
      <div onClick={toggleSort} className='flex items-center gap-1 text-slate-500'>
        <span className={`${isSorted && 'font-bold'} select-none `} onDoubleClick={handleSort}>
          {label}
        </span>

        {isSorted && (
          <svg
            className={`w-4 h-4 text-slate-500 font-bold ${
              sorters?.[colKey] === 'asc' ? 'transform rotate-180' : ''
            }`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 10l7-7m0 0l7 7m-7-7v18'
            />
          </svg>
        )}
      </div>
    </td>
  );
};

export default TableHeaderCell;
