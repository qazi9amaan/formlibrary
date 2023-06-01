import { useState } from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';

import SideNavItem from './SideNavItem';
import SideNavMenu from './SideNavMenu';
import type { ISideNavItem, ISideNavMenu, ISideNavs } from './types';

type Props = {
  navs: ISideNavs;
  onLogout?: () => void;
  showLogout?: boolean;
  appLogo?: string;
  pathName: string;
};

const hasMenu = (nav: ISideNavItem | ISideNavMenu): nav is ISideNavMenu =>
  (nav as ISideNavMenu).children !== undefined;

const SideNav: React.FC<Props> = ({ navs, showLogout, onLogout, appLogo, pathName }) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleToggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <>
      {/* HEADER */}
      <header className='items-center flex px-2 py-4 sm:!hidden border-b top-0 sticky left-0'>
        <button
          type='button'
          onClick={handleToggleMenu}
          aria-controls='sidebar-multi-level-sidebar'
          className='ml-3 text-sm text-gray-400 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 '
        >
          <span className='sr-only'>Open sidebar</span>
          <RxHamburgerMenu className='h-7 w-7' />
        </button>
        <a href='/' className='ml-4'>
          <img src={appLogo} className='h-6' alt='Logo' />
        </a>
      </header>

      {/* SIDEBAR */}
      <aside
        className={twMerge(
          'fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0',
          showMenu && 'translate-x-0',
        )}
        aria-label='Sidebar'
      >
        <nav className='h-full px-3 py-4 overflow-y-auto bg-slate-50 relative border-r border-gray-200'>
          <div className='hidden sm:!block mb-8 items-center justify-between'>
            <a href='/' className='flex items-center '>
              <img src={appLogo} className='h-10' alt='Logo' />
            </a>
          </div>
          <ul className='space-y-3 font-medium flex-grow min-h-[70%]'>
            {navs?.map((nav) => {
              if (hasMenu(nav)) return <SideNavMenu {...nav} key={nav.title} pathName={pathName} />;
              return <SideNavItem {...nav} key={nav.title} pathName={pathName} />;
            })}
          </ul>

          {showLogout && (
            <ul className='pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700'>
              <li>
                <button
                  onClick={onLogout}
                  className='flex items-center w-full p-2 text-gray-500 transition duration-75 rounded-lg hover:bg-red-100 cursor-pointer  hover:text-red-700 '
                >
                  <AiOutlinePoweroff className='w-6 h-6' />
                  <span className='ml-4'>Logout</span>
                </button>
              </li>
            </ul>
          )}
        </nav>
      </aside>

      <div
        className={twMerge(
          'fixed top-0 left-0 z-30 w-full h-screen transition-opacity bg-black opacity-0 pointer-events-none',
          showMenu && 'opacity-50 pointer-events-auto',
        )}
        aria-hidden='true'
        onClick={handleToggleMenu}
      ></div>
    </>
  );
};

export default SideNav;
