import { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import './FilterBox.style.css';
import { useTableContext } from '../TableProvider';
import dayjs from 'dayjs';
import { useDisableAfter } from '../../../../hooks';

export type DateRangeValue = [Date | null, Date | null];

const now = new Date();
const yesterday = dayjs(new Date()).subtract(1, 'month').toDate();

function FilterBox() {
  const { dateRange, onDateRangeChange } = useTableContext();
  const [value, onChange] = useState<DateRangeValue>(dateRange || [yesterday, now]);
  const { disabled, setDisabled } = useDisableAfter();

  const isDisabled = () => {
    if (!value) return true;
    if (!value?.[0] || !value?.[1]) return true;
    return false;
  };

  const handleOnClick = () => {
    setDisabled(true);
    onDateRangeChange?.(value);
  };

  return (
    <div className='flex rounded-lg px-5 py-0.5 border space-x-1 items-center'>
      <DateRangePicker
        onChange={onChange}
        format='dd/MM/yyyy'
        value={value}
        calendarIcon={null}
        className='table-date-picker   border-none outline-0  text-gray-600'
        calendarClassName='table-date-picker-calender'
      />
      <button
        disabled={disabled || isDisabled()}
        onClick={handleOnClick}
        className=' hover:font-semibold text-gray-500 transition ease-in-out duration-500 active:text-blue-600
            disabled:cursor-not-allowed disabled:opacity-50 disabled:text-gray-400 disabled:hover:font-normal
        '
      >
        Find
      </button>
    </div>
  );
}

export default FilterBox;
