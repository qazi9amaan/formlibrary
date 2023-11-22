import { twMerge } from 'tailwind-merge';
import { AllSelectCell } from './Cells/AllSelectCell';
import TableHeaderCell from './Cells/HeaderCell';
import { MultSelectActions } from './Cells/MultSelectActions';
import { useTableContext } from './TableProvider';
import { ITableCellHeader } from './types';
import ViewColumnsFilter from './Layout/ViewColumnsFilter';
import FilterBox from './Layout/FilterBox';

export const TableHeader = () => {
  const {
    searchTerm,
    showSelect,
    showSearch,
    showDateRange,
    columns,
    setColumns,
    setSearchTerm,
    selectedItems,
  } = useTableContext();

  return (
    <thead className='bg-gray-100 overflow-hidden '>
      <tr className='border-b border-gray-200'>
        {showSelect && selectedItems?.length > 0 && (
          <th className='bg-gray-100 w-10 text-gray-500'>{selectedItems?.length}</th>
        )}
        <td colSpan={columns?.length + 1}>
          <div
            className={twMerge(
              ' w-full flex p-1 py-2 items-center px-3',
              showSearch ? 'justify-between' : 'justify-end',
            )}
          >
            {showSearch && (
              <input
                type='search'
                value={searchTerm}
                placeholder='Search for anything'
                onChange={(e) => setSearchTerm?.(e.target.value)}
                className='w-1/5 ml-2 h-9 text-sm rounded-full px-5 border-gray-200 focus:outline-none bg-gray-100 focus:w-1/3 transition-all duration-500 ease-in-out focus:ring-0 focus:border-gray-300 focus:bg-white '
              />
            )}
            {showDateRange && <FilterBox />}
            <div className='flex items-center space-x-3'>
              <ViewColumnsFilter columns={columns} setColumns={setColumns} />
              {showSelect && <MultSelectActions />}
            </div>
          </div>
        </td>
      </tr>
      <tr>
        {/* SelectBox */}
        {showSelect && <AllSelectCell />}
        {/* columns  */}
        {columns?.map((item: ITableCellHeader, i) => {
          if (item?.hidden) return null;
          return (
            <TableHeaderCell
              key={`${item?.label}/${item.key}/${i}`}
              {...item}
              colKey={item.key as string}
            />
          );
        })}
      </tr>
    </thead>
  );
};
