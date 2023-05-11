import { memo } from 'react';

import { IAction } from '../types';
import ActionChildCell from '../ChildCells/ActionChildCell';

type Props<T> = {
  actions: IAction<T>[];
  currentRow: T;
};

const ActionCell = memo(<T = unknown,>({ actions, currentRow }: Props<T>) => {
  return (
    <td className='px-4  whitespace-nowrap text-sm font-medium'>
      {actions?.map((item: any, i: number) => (
        <ActionChildCell currentRow={currentRow} key={i} action={item} />
      ))}
    </td>
  );
});

export default ActionCell;
