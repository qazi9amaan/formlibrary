import React from 'react';
import { useTableContext } from '../TableProvider';
import { FaCaretDown } from 'react-icons/fa';
import avoidMultipleClick from '@lib/util/helpers/avoidMultipleClick';

const MultActions = () => {
  //
  const { selectedItems, selectActions, handleSelectAction } = useTableContext();

  return (
    <div className='dropdown inline-block relative'>
      <button className='inline-flex items-center text-gray-500'>
        Actions
        <FaCaretDown className='ml-1' />
      </button>
      <div className='dropdown-menu absolute right-0 hidden '>
        <ul className='shadow rounded bg-white min-w-[150px] mt-2'>
          <p className='px-3 text-xs opacity-30 py-1.5 border-b '>
            Selected ({selectedItems.length})
          </p>
          {selectActions?.map((action) => (
            <li key={action}>
              <button
                onClick={avoidMultipleClick(() => handleSelectAction?.(action, selectedItems))}
                type='button'
                disabled={!selectedItems.length}
                className='w-full px-4 py-2 text-sm text-left
                   text-gray-500 hover:bg-gray-100 font-medium
                   hover:text-gray-900 capitalize cursor-pointer'
              >
                {action}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const MultSelectActions = React.memo(MultActions);
