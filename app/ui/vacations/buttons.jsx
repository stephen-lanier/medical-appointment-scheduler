import Link from 'next/link';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteVacation } from '@/app/server';

export function CreateVacation() {
  return (
    <Link
      href='/dashboard/vacations/create'
      className='flex h-10 items-center rounded-lg bg-slate-500 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600'
    >
      <span className='hidden md:block'>Create Vacation</span>{' '}
      <PlusIcon className='h-5 md:ml-4' />
    </Link>
  );
}

export function UpdateVacation({ id }) {
  return (
    <Link
      href={`/dashboard/vacations/${id}/edit`}
      className='rounded-md border p-2 hover:bg-gray-100'
    >
      <PencilIcon className='w-5' />
    </Link>
  );
}

export function DeleteVacation({ id }) {
  const deleteVacationWithID = deleteVacation.bind(null, id);
  return (
    <form action={deleteVacationWithID}>
      <button className='rounded-md border p-2 hover:bg-gray-100'>
        <span className='sr-only'>Delete</span>
        <TrashIcon className='w-5' />
      </button>
    </form>
  );
}
