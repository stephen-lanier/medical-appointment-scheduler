'use server';
import Link from 'next/link';
import {
    ClipboardDocumentListIcon,
    ClockIcon,
    CalendarDaysIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import Button from '@/app/ui/button';
import { getPhysicians, createAppointment } from '@/app/server';

export default async function Page({ params }) {

    const id = params.id;
    const createAppointmentWithID = createAppointment.bind(null, id);
    const physicians = await getPhysicians('');

    return (
        <main className="font-mono text-slate-800 p-5 bg-slate-50 uppercase">
            <div className="flex">
                {/* <h1>Create Appointment</h1> */}
                <form action={createAppointmentWithID}>
                    <div className="rounded-md bg-gray-50 p-4 md:p-6">

                        {/* Physician Name */}
                        <div className="mb-4">
                            <label htmlFor="physicianid" className="mb-2 block text-sm font-medium">
                                Choose physician
                            </label>
                            <div className="relative">
                                <select
                                    id="physicianid"
                                    name="physicianid"
                                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select a physician
                                    </option>
                                    {physicians.map((physician) => (
                                        <option key={physician.PhysicianID} value={physician.PhysicianID}>
                                            {physician.Name}
                                        </option>
                                    ))}
                                </select>
                                <ClipboardDocumentListIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="mb-4">
                            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                                Enter a date
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        placeholder="Enter a date as mm-dd-yyyy"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                    <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>

                        {/* Start Time */}
                        <div className="mb-4">
                            <label htmlFor="start time" className="mb-2 block text-sm font-medium">
                                Enter a start time
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        id="starttime"
                                        name="starttime"
                                        type="time"
                                        placeholder="Enter a start time"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                    <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <Link
                            href="/dashboard/appointments"
                            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                        >
                            Cancel
                        </Link>
                        <Button type="submit">Create Appointment</Button>
                    </div>
                </form>
            </div>
        </main>
    );
}