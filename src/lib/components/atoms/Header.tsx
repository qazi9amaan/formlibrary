import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  title: string;
  subtitle?: string;
  backIcon?: boolean;
  onBack?: () => void;
  mb?: string;
};

export const Header: React.FC<HeaderProps> = (props) => {
  //
  const { onBack, title, subtitle, backIcon, mb = 'mb-2' } = props;

  return (
    <div className={`flex space-x-2  w-full ${mb}`}>
      {backIcon && (
        <FiArrowLeft
          onClick={onBack}
          className='text-3xl md:text-4xl mt-1 p-1 md:p-2  bg-blue-50 rounded-full  font-semibold cursor-pointer  text-blue-700 hover:text-blue-500'
        />
      )}
      <div className='w-full'>
        <h3 className='text-2xl md:text-3xl font-semibold'>
          <span>{title}</span>
        </h3>
        {subtitle && <p className=' text-sm opacity-70'>{subtitle}</p>}
      </div>
    </div>
  );
};
