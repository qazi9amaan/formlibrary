export type AlertProps = {
  message: string;
  show: boolean;
  title?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
};

export const Alert: React.FC<AlertProps> = ({ title, message, show, type }) => {
  if (!show) return <></>;

  const classes = {
    error: 'bg-red-100 border-red-400 text-red-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  };

  const cx = classes[type || 'error'];
  return (
    <div className={`${cx} border px-4 py-3 rounded mt-4 mb-2 animate-pulse`} role='alert'>
      <strong className='font-bold'>{title}</strong>
      <span className='block sm:inline sm:pl-2'>{message}</span>
    </div>
  );
};

Alert.defaultProps = { title: 'Holy smokes!' };
