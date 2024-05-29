import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function Next() {
    return (
        <Link
            href="/dashboard/patients/create"
            className="flex h-10 items-center rounded-lg bg-slate-500 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
        >
            <span className="hidden md:block">Next</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function Select({ id }) {
    return (
        <Link
            href={`/dashboard/appointments/${id}/create`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <ArrowRightIcon className="w-5" />
        </Link>
    );
}