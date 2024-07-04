'use client';

import { useEffect } from 'react';

import Button from '@/app/ui/button';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className='flex h-full flex-col items-center justify-center'>
      <h2 className='text-center'>{error.message}</h2>
      <Button
        className='mt-4 rounded-md px-4 py-2 text-sm transition-colors'
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </Button>
    </main>
  );
}
