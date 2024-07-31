'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ name }) {
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

  const dobSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('dob', term);
    } else {
      params.delete('dob');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const contactSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('contact', term);
    } else {
      params.delete('contact');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <>
      <div className='relative flex flex-1 flex-shrink-0'>
        <label htmlFor='search' className='sr-only'>
          Search patient name
        </label>
        <input
          className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
          placeholder='Search by patient name'
          onChange={(e) => {
            patientSearch(e.target.value);
          }}
          defaultValue={searchParams.get('patient')?.toString()}
        />
        <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
      </div>

      <div className='relative flex flex-1 flex-shrink-0'>
        <label htmlFor='search' className='sr-only'>
          Search by date of birth
        </label>
        <input
          type='date'
          className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
          placeholder='Search by date of birth'
          onChange={(e) => {
            dobSearch(e.target.value);
          }}
          defaultValue={searchParams.get('dob')?.toString()}
        />
        <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
      </div>

      <div className='relative flex flex-1 flex-shrink-0'>
        <label htmlFor='search' className='sr-only'>
          Search by contact info
        </label>
        <input
          className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
          placeholder='Search by contact info'
          onChange={(e) => {
            contactSearch(e.target.value);
          }}
          defaultValue={searchParams.get('contact')?.toString()}
        />
        <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
      </div>
    </>
  );
}
