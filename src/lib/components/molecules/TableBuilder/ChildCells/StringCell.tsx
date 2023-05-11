type Props = {
  value: string;
  isLink?: boolean;
  isCurrency?: boolean;
};

const StringCell = ({ value, isCurrency, isLink }: Props) => {
  return (
    <span
      className={`${isLink && '!text-blue-700 font-medium cursor-pointer hover:!text-blue-500'}`}
    >
      {value}
      {isCurrency && '/='}
    </span>
  );
};

export default StringCell;
