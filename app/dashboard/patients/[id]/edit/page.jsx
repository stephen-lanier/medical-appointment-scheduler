import Link from 'next/link';
import {
    UserIcon,
    ClockIcon,
    EnvelopeIcon
} from '@heroicons/react/24/outline';
import Button from '@/app/ui/button';
import { updatePatient } from '@/app/server';

export default async function Page({ params }) {

    const id = params.id;
    const updatePatientWithId = updatePatient.bind(null, id);

    return (
        <main className="font-mono text-slate-800 p-5 bg-slate-50 uppercase">
            <div className="flex">
                {/* <h1>Create Appointment</h1> */}
                <form action={updatePatientWithId}>
                    <div className="rounded-md bg-gray-50 p-4 md:p-6"> 
                        {/* Name */}
                        <div className="mb-4">
                            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                                Enter Patient Name
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="patient's full name"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                    <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>
                        {/* DOB */}
                        <div className="mb-4">
                            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                                Enter Date of Birth
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        id="dob"
                                        name="dob"
                                        type="date"
                                        placeholder="Enter a date as mm-dd-yyyy"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                    <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>
                        {/* Contact Info */}
                        <div className="mb-4">
                            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                                Enter Contact Info
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        id="contact"
                                        name="contact"
                                        type="text"
                                        placeholder="example@email.com"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                    <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <Link
                            href="/dashboard/patients"
                            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                        >
                            Cancel
                        </Link>
                        <Button type="submit">Update Patient</Button>
                    </div>
                </form>
            </div>
        </main>
    );
}