import get from 'lodash/get';
import { useTableContext } from '../TableProvider';

export const AllSelectCell = () => {
  //
  const { selectedItems, setSelectedItems, rows, idKey } = useTableContext();
  const areAllSelected = selectedItems?.length === rows?.length;

  const handleSelectAll = () => {
    if (areAllSelected) return setSelectedItems([]);
    setSelectedItems(rows.map((item) => get(item, idKey)));
  };

  return (
    <th className=' bg-gray-100 !px-3 text-left'>
      <label className='sr-only' htmlFor='SelectAll'>
        Select All
      </label>
      <input
        className='h-5 w-5 rounded border-gray-200'
        type='checkbox'
        id='SelectAll'
        checked={!!(rows?.length && areAllSelected)}
        onChange={handleSelectAll}
      />
    </th>
  );
};
