import Link from 'next/link';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deletePatient } from '@/app/server';

export function CreatePatient() {
    return (
        <Link
            href="/dashboard/patients/create"
            className="flex h-10 items-center rounded-lg bg-slate-500 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
        >
            <span className="hidden md:block">Create Patient</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdatePatient({ id }) {
    return (
        <Link
            href={`/dashboard/patients/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeletePatient({ id }) {
    const deletePatientWithID = deletePatient.bind(null, id);
    return (
        <form action={deletePatientWithID}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}