import { useTableContext } from '../TableProvider';

export type ISelectBoxProps = {
  idKeyValue: string;
};

export const SelectCell = <T = unknown,>({ idKeyValue }: ISelectBoxProps) => {
  //
  const { selectedItems, setSelectedItems } = useTableContext<T>();

  const handleSelect = () => {
    if (selectedItems.includes(idKeyValue))
      return setSelectedItems(selectedItems.filter((id) => id !== idKeyValue));
    setSelectedItems([...selectedItems, idKeyValue]);
  };

  return (
    <td className='!px-3 !shrink-0  text-left'>
      <label className='sr-only' htmlFor={idKeyValue}>
        Select
      </label>
      <input
        className='h-5 w-5 rounded border-gray-200'
        type='checkbox'
        id='SelectAll'
        checked={selectedItems.includes(idKeyValue)}
        onChange={handleSelect}
      />
    </td>
  );
};
