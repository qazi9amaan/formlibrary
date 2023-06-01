import { twMerge } from 'tailwind-merge';

import type { ISideNavItem } from './types';

const SideNavItem: React.FC<ISideNavItem & { pathName?: string }> = ({
  icon,
  title,
  href,
  pathName,
}) => {
  const isActive = pathName === href;
  const iconcx = 'flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75';
  return (
    <li>
      <a
        href={href}
        className={twMerge(
          'flex items-center text-lg p-2 w-full text-gray-500 transition duration-75 rounded-lg sm:hover:bg-gray-200  ',
          isActive && 'text-black font-semibold',
        )}
      >
        <span>{icon && icon({ className: iconcx })}</span>
        <span className={twMerge('flex-1 ml-2 sm:ml-3 whitespace-nowrap h-6')}>{title}</span>
      </a>
    </li>
  );
};

export default SideNavItem;
