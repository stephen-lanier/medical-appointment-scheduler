'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const patientSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('patient', term);
    } else {
      params.delete('patient');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const physicianSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('physician', term);
    } else {
      params.delete('physician');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const dateSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('date', term);
    } else {
      params.delete('date');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <>
      <div className='relative flex flex-1 flex-shrink-0'>
        <label htmlFor='search' className='sr-only'>
          Search by patient
        </label>
        <input
          className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
          placeholder={'Search by patient name'}
          onChange={(e) => {
            patientSearch(e.target.value);
          }}
          defaultValue={searchParams.get('patient')?.toString()}
        />
        <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
      </div>
      <div className='relative flex flex-1 flex-shrink-0'>
        <label htmlFor='search' className='sr-only'>
          Search by physician
        </label>
        <input
          className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
          placeholder={'Search by physician name'}
          onChange={(e) => {
            physicianSearch(e.target.value);
          }}
          defaultValue={searchParams.get('physician')?.toString()}
        />
        <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
      </div>
      <div className='relative flex flex-1 flex-shrink-0'>
        <label htmlFor='search' className='sr-only'>
          Search by date
        </label>
        <input
          type='date'
          className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
          placeholder={'Search by date'}
          onChange={(e) => {
            dateSearch(e.target.value);
          }}
          defaultValue={searchParams.get('date')?.toString()}
        />
        <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
      </div>
    </>
  );
}
