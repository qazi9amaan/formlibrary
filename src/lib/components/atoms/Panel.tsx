import { cn } from '@lib/util/helpers/tailwindClass';
import React from 'react';

type Props = {
  children: React.ReactNode;
  header?: string;
  collapsible?: boolean;
  p?: string; // { top, right, bottom, left}
  cs?: string;
};

export const Panel = (props: Props) => {
  const { children, p = '.5em 0 .5em 0', collapsible = false, header, cs = '' } = props;
  const [isCollapsed, setIsCollapsed] = React.useState(collapsible);

  return (
    <div
      className={`bg-white-50 mt-2 rounded-2xl transition-all p-2 ease-in-out duration-500  border border-gray-100 ${cs}`}
    >
      <div className={cn(' px-2 md:px-5 overflow-x-auto ', collapsible ? 'py-3 ' : 'pt-2 pb-6')}>
        <div
          className={cn('flex items-center justify-between pr-1', collapsible && 'cursor-pointer')}
          onClick={() => collapsible && setIsCollapsed((p) => !p)}
        >
          {<h3 className='text-slate-400 uppercase text-sm font-semibold'>{header || ' '}</h3>}
          {collapsible && (
            <div className='flex items-center justify-end'>
              <button className='text-slate-400 hover:text-slate-500'>
                <svg
                  style={{
                    transform: !isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div
          style={{
            maxHeight: !isCollapsed ? '100%' : '0px',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: p }}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
