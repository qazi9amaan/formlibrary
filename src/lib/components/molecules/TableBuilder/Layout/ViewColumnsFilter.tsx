import React from 'react';
import { FiEye } from 'react-icons/fi';
import { ITableHeader } from '../types';

type Props = {
  columns: ITableHeader;
  setColumns: React.Dispatch<React.SetStateAction<ITableHeader>>;
};

const ViewColumnsFilter = ({ columns, setColumns }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setColumns((prev) =>
      prev.map((item) => {
        if (item?.key === name) {
          return { ...item, hidden: !checked };
        }
        return item;
      }),
    );
  };

  return (
    <div className='dropdown inline-block relative'>
      <button className='inline-flex items-center text-gray-500'>
        <FiEye className='w-4 h-4 mr-1' />
        <span className='capitalize'>View</span>
      </button>
      <div className='dropdown-menu absolute right-0 hidden '>
        <ul className='shadow rounded bg-white min-w-[150px] mt-2'>
          {columns?.map((column, index) => {
            if (['actions'].includes(String(column?.type))) return null;
            return (
              <li
                key={`view/change/${column.key}/${index}`}
                className='py-2   hover:bg-gray-100 
                  text-gray-500 cursor-pointer w-full'
              >
                <label className='flex items-center cursor-pointer px-3 w-full '>
                  {column?.label}
                  <input
                    type='checkbox'
                    name={column?.key as string}
                    className='ml-auto mr-2'
                    checked={!column?.hidden}
                    onChange={handleChange}
                  />
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ViewColumnsFilter;
