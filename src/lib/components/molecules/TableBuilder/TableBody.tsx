import { IAction, ITableCellHeader } from './types';
import get from 'lodash/get';
import ActionCell from './Cells/ActionCell';
import { ValueCell } from './Cells/ValueCell';
import { SelectCell } from './Cells/SelectCell';
import { useTableContext } from './TableProvider';

export const TableBody = <T = unknown,>() => {
  const { showSelect, columns, idKey, rows } = useTableContext<T>();

  return (
    <tbody>
      {!rows?.length && (
        <tr>
          <td colSpan={columns?.length + 1} className='text-center py-2 text-gray-400'>
            No Data Found
          </td>
        </tr>
      )}
      {rows?.map((row: T, i) => {
        const idKeyValue = get(row, idKey);
        const key = `${idKeyValue}/${i}`; // map rows
        // map columns
        return (
          <tr
            key={key}
            className='transition-all ease-in-out duration-500 border-t border-gray-100 '
          >
            {/* SelectBox */}
            {showSelect && <SelectCell key={`${key}/select`} idKeyValue={idKeyValue} />}
            {/*  */}

            {columns?.map((column: ITableCellHeader<T>, index: number) => {
              // in case of actions column
              if (column.type === 'actions')
                return (
                  <ActionCell
                    key={`${key}/${index}/action`}
                    currentRow={row}
                    actions={column?.actions as IAction<unknown>[]}
                  />
                );
              // in case of value column
              return (
                <ValueCell
                  key={`/${key}/${column.key}/${index}`}
                  currentRow={row}
                  column={column as any}
                />
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
