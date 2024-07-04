'use client';

import clsx from 'clsx';

export default function Tile({ title, data, className }) {
  return (
    <div className={clsx('flex flex-col', className)}>
      <p className='flex flex-1 items-center justify-center text-5xl font-extrabold'>
        {data}
      </p>
      <p className='flex justify-center text-slate-500'>{title}</p>
    </div>
  );
}
