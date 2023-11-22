import React, { memo } from 'react';
import { IBadgeColors } from '../types';

type Props = {
  value: string;
  badgeMap: IBadgeColors;
  shallow?: boolean;
};

interface BadgeBg {
  [key: string]: string;
}

const badgeBg: BadgeBg = {
  green: 'bg-green-100 text-green-800',
  red: 'bg-red-100 text-red-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  blue: 'bg-blue-100 text-blue-800',
  black: 'bg-black text-white',
  grey: 'bg-gray-100 text-gray-800',
};

const getColor = (value: string, badgeMap: IBadgeColors, shallow?: boolean) => {
  for (const [key, badgeValue] of Object.entries(badgeMap)) {
    if (shallow) {
      if (value.includes(String(badgeValue))) {
        return badgeBg[key] || badgeBg.grey;
      }
    }

    if (badgeValue === value) {
      return badgeBg[key] || badgeBg.grey;
    }
  }
  return badgeBg.grey;
};

const BadgeCell: React.FC<Props> = memo(({ value, badgeMap, shallow }) => {
  const color = getColor(value, badgeMap, shallow);
  return (
    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-2xl ${color}`}>
      {value}
    </span>
  );
});

export default BadgeCell;
