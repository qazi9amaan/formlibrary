import { AllSelectCell } from './Cells/AllSelectCell';
import TableHeaderCell from './Cells/HeaderCell';
import { MultSelectActions } from './Cells/MultSelectActions';
import { useTableContext } from './TableProvider';
import { ITableCellHeader } from './types';

export const TableHeader = () => {
  const { showSelect, showSearch, columns, searchTerm, setSearchTerm } = useTableContext();

  const showHeader = showSelect || showSearch;

  return (
    <thead className='bg-gray-100 '>
      {showHeader && (
        <tr className='border-b border-gray-200'>
          <td colSpan={showSelect ? columns?.length + 1 : columns?.length}>
            <span
              className={`flex p-1  py-2 w-full ${
                showSearch ? 'justify-between' : 'justify-end'
              } items-center`}
            >
              {showSearch && (
                <input
                  type='search'
                  placeholder='Search for anything'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm?.(e.target.value)}
                  className='w-1/5 ml-2 h-9 text-sm rounded-full px-5 border-gray-200 focus:outline-none bg-gray-100 focus:w-1/3 transition-all duration-500 ease-in-out focus:ring-0 focus:border-gray-300 focus:bg-white '
                />
              )}
              {showSelect && <MultSelectActions />}
            </span>
          </td>
        </tr>
      )}
      <tr>
        {/* SelectBox */}
        {showSelect && <AllSelectCell />}
        {/* columns  */}
        {columns?.map((item: ITableCellHeader) => (
          <TableHeaderCell key={item.label} {...item} colKey={item.key as string} />
        ))}
      </tr>
    </thead>
  );
};
