import get from 'lodash/get';
import { useTableContext } from '../TableProvider';
import { IAction } from '../types';
import { memo } from 'react';
import avoidMultipleClick from '@lib/util/helpers/avoidMultipleClick';

type Props<T> = {
  action: IAction<T>;
  currentRow: T;
};

const ActionChildCell = memo(<T = unknown,>({ action, currentRow }: Props<T>) => {
  const { handleActions, idKey } = useTableContext<T>();
  const label = typeof action === 'string' ? action : action.whenRowHas(currentRow);

  const handleAction = avoidMultipleClick(() => {
    const idKeyValue = get(currentRow, idKey);
    handleActions?.(label, idKeyValue, currentRow);
  });

  return (
    <button
      onClick={handleAction}
      className='text-indigo-600 me-2 font-semibold hover:text-indigo-900 capitalize'
    >
      {label}
    </button>
  );
});

export default ActionChildCell;
