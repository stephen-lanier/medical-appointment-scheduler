import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { CircleStackIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className='flex h-full flex-col px-3 py-4 font-mono uppercase md:px-2'>
      <Link
        className='mb-2 flex h-20 items-end justify-center rounded-md bg-slate-400 p-4 md:h-40'
        href='/'
      >
        <CircleStackIcon className='w-24 text-white md:w-32' />
        {/* <div className="w-32 text-white md:w-40">
                    HOME
                </div> */}
      </Link>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <NavLinks />
        <div className='hidden h-auto w-full grow rounded-md bg-slate-100 md:block'></div>
        <form>
          <button className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-slate-100 p-3 text-sm font-medium hover:bg-slate-200 hover:text-slate-600 md:flex-none md:justify-start md:p-2 md:px-3'>
            <div className='hidden md:block'>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
