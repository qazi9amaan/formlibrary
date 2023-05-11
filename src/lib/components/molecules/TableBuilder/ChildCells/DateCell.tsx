import dayjs from 'dayjs';
import { memo } from 'react';
type Props = {
  value: string;
  isTimeAgo?: boolean;
};

const formatTime = (r: string) => {
  const rs = r.split(' ');
  return `${rs[0]} ${Number(rs[0]) > 1 ? rs[1] + 's' : rs[1]} ${rs[2] || ''}`;
};

const daysAgo = (date: string) => {
  const today = dayjs();
  const dateToCheck = dayjs(date);
  const diff = Math.abs(today.diff(dateToCheck, 'second'));
  // if greater than today
  if (diff > 0) return formatTime(getTimeAgo(diff, ''));
  // if is less than today
  return formatTime(getTimeAgo(diff));
};

const getTimeAgo = (diff: number, prefix = 'ago') => {
  // return just now secs, mins, hours, days, weeks , months, years
  switch (true) {
    case diff < 1:
      return 'Just now';
    case diff < 60:
      return `${diff} sec ${prefix}`;
    case diff < 3600:
      return `${Math.round(diff / 60)} min ${prefix}`;
    case diff < 86400:
      return `${Math.round(diff / 3600)} hour ${prefix}`;
    case diff < 604800:
      return `${Math.round(diff / 86400)} day ${prefix}`;
    case diff < 2629743:
      return `${Math.round(diff / 604800)} week ${prefix}`;
    case diff < 31556926:
      return `${Math.round(diff / 2629743)} month ${prefix}`;
    default:
      return `${Math.round(diff / 31556926)} year ${prefix}`;
  }
};

const DateCell = memo(({ value, isTimeAgo }: Props) => {
  const time = isTimeAgo ? daysAgo(value) : dayjs(value).format('DD MMM YYYY');
  return <span>{time}</span>;
});

export default DateCell;
