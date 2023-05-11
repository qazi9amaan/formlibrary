import { ITableCellHeader } from '../types';
import { useTableContext } from '../TableProvider';
import get from 'lodash/get';
import { Button } from '@lib/components/atoms/Button';
import StringCell from '../ChildCells/StringCell';
import BooleanCell from '../ChildCells/BooleanCell';
import ImageCell from '../ChildCells/ImageCell';
import BadgeCell from '../ChildCells/BadgeCell';
import { memo } from 'react';
import DateCell from '../ChildCells/DateCell';

type Props<T> = {
  column: ITableCellHeader<T>;
  currentRow: T;
};

const Cell = <T = unknown,>({ currentRow, column }: Props<T>) => {
  const { handleCellClick } = useTableContext<T>();

  const _value = get(currentRow, column.key as string);
  const value = column?.extract ? column?.extract?.(_value) : _value;

  const handleClick = () => {
    if (['button', 'link'].includes(column.type))
      handleCellClick?.(column.key as string, value, currentRow);
  };

  const renderCellContent = () => {
    switch (column.type) {
      case 'date':
        return <DateCell value={value} />;
      case 'timeAgo':
        return <DateCell value={value} isTimeAgo />;
      case 'image':
        return <ImageCell value={value} />;
      case 'boolean':
        return <BooleanCell value={value} />;
      case 'badge':
        return <BadgeCell value={value} badgeMap={column.badges} />;
      case 'link':
        return <StringCell value={value} isLink />;
      case 'button':
        return <Button label={value} />;
      case 'currency':
        return <StringCell value={value} isCurrency />;
      case 'string':
      default:
        return <StringCell value={value} />;
    }
  };

  return (
    <td className='px-4 py-1 whitespace-nowrap  text-sm ' onClick={handleClick}>
      {renderCellContent()}
    </td>
  );
};

export const ValueCell = memo(Cell) as typeof Cell;
