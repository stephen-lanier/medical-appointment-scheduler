'use server';
import Link from 'next/link';
import {
    ClipboardDocumentListIcon,
    ClockIcon,
    CalendarDaysIcon,
    EnvelopeIcon,
    CheckIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline';
import Button from '@/app/ui/button';
import { getPhysicians, createVacation } from '@/app/server';

export default async function Page() {

    const physicians = await getPhysicians('');

    return (
        <main className="font-mono text-slate-800 p-5 bg-slate-50 rounded-2xl uppercase">
            <div className="flex">
                {/* <h1>Create Vacation</h1> */}
                <form action={createVacation}>
                    <div className="rounded-md bg-gray-50 p-4 md:p-6">
                        {/* Physicians Name */}
                        <div className="mb-4">
                            <label htmlFor="patient" className="mb-2 block text-sm font-medium">
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

                        {/* Start Date */}
                        <div className="mb-4">
                            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                                Enter a start date
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        id="startdate"
                                        name="startdate"
                                        type="date"
                                        placeholder="Enter a date as mm-dd-yyyy"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                    <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>

                        {/* End Date */}
                        <div className="mb-4">
                            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                                Enter an end date
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        id="enddate"
                                        name="enddate"
                                        type="date"
                                        placeholder="Enter a date as mm-dd-yyyy"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                    <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                                Enter Description
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder="..."
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                    <PencilSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <fieldset>
                            <legend className="mb-2 block text-sm font-medium">
                                Set the status
                            </legend>
                            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                                <div className="flex gap-4">
                                    <div className="flex items-center">
                                        <input
                                            id="pending"
                                            name="status"
                                            type="radio"
                                            value="pending"
                                            className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                        />
                                        <label
                                            htmlFor="pending"
                                            className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                        >
                                            Pending <ClockIcon className="h-4 w-4" />
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="approved"
                                            name="status"
                                            type="radio"
                                            value="approved"
                                            className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                        />
                                        <label
                                            htmlFor="approved"
                                            className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                        >
                                            Approved <CheckIcon className="h-4 w-4" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>


                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <Link
                            href="/dashboard/vacations"
                            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                        >
                            Cancel
                        </Link>
                        <Button type="submit">Create Vacation</Button>
                    </div>
                </form>
            </div>
        </main>
    );
}