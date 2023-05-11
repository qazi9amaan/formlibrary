import React from 'react';
import { useTableContext } from '../TableProvider';

const MultActions = () => {
  //
  const { selectedItems, selectActions, handleSelectAction } = useTableContext();

  return (
    <div className='flex gap-1 pe-3 h-auto'>
      {selectActions?.map((action) => (
        <button
          key={action}
          onClick={() => handleSelectAction?.(action, selectedItems)}
          type='button'
          disabled={!selectedItems.length}
          className='multiselect-btn'
        >
          {action}
        </button>
      ))}

      {!selectActions?.length && (
        <span className='text-gray-400 text-medium'>Add select actions</span>
      )}
    </div>
  );
};

export const MultSelectActions = React.memo(MultActions);
