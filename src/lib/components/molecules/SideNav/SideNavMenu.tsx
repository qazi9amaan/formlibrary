import { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

import SideNavItem from './SideNavItem';
import type { ISideNavMenu } from './types';

const SideNavMenu: React.FC<ISideNavMenu & { pathName?: string }> = ({
  icon,
  title,
  children,
  baseHref,
  pathName,
}) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleToggleMenu = () => setToggleMenu((prev) => !prev);

  useEffect(() => {
    setIsActive(false);
    if (baseHref && pathName?.startsWith(baseHref)) {
      setToggleMenu(true);
      setIsActive(true);
    }
  }, [pathName, baseHref]);

  const iconcx = 'flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75';

  return (
    <li>
      <button
        onClick={handleToggleMenu}
        type='button'
        className={twMerge(
          'flex text-lg p-2  items-center w-full text-gray-500 transition duration-75 rounded-lg group hover:bg-gray-200  ',
          isActive && 'text-black font-semibold',
        )}
        aria-controls={`dropdown-${title}`}
        data-collapse-toggle={toggleMenu}
      >
        {icon && icon({ className: iconcx })}
        <span className='flex-1 ml-2 sm:ml- text-left whitespace-nowrap h-6'>{title}</span>
        <FiChevronDown className={twMerge('w-6 h-6 ml-2', toggleMenu && 'rotate-180')} />
      </button>

      {toggleMenu && (
        <ul id={`dropdown-${title}`} className='pl-6 pt-2'>
          {children.map((child) => (
            <SideNavItem pathName={pathName} {...child} key={child.title} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SideNavMenu;
