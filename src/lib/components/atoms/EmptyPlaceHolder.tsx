export const EmptyPlaceHolder = () => {
  return (
    <div className='flex items-center justify-center p-5 w-full bg-white'>
      <div className='text-center'>
        <div className='inline-flex rounded-full bg-yellow-100 p-4'>
          <div className='rounded-full stroke-yellow-600 bg-yellow-200 p-4'>
            <svg
              className='w-8 h-8 sm:w-16 sm:h-16'
              viewBox='0 0 28 28'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
          </div>
        </div>
        <h1 className=' mt-2 sm:mt-8 text-lg sm:text-[36px] font-bold text-slate-800 lg:text-[50px]'>
          Can&apos;t find anything
        </h1>
        <p className='text-slate-600 mt-1 sm:mt-6 text-xs md:text-lg'>
          Oops something went wrong. Try to refresh this page or <br /> feel free to contact us if
          the problem presists.
        </p>
      </div>
    </div>
  );
};
