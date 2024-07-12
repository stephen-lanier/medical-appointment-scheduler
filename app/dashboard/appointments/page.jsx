import Search from '../../ui/appointments/search';
import ResultsTable from '@/app/ui/results-table';
import { getAppts } from '@/app/server';
import {
    CreateAppointment,
    UpdateAppointment,
    DeleteAppointment,
} from '@/app/ui/appointments/buttons';

export default async function Page({ searchParams }) {
    const patientName = searchParams?.patient || '';
    const physicianName = searchParams?.physician || '';
    const date = searchParams?.date || '';
    const searchFields = [patientName, physicianName, date];
    const resultFields = [
        'ID',
        'Patient',
        'Physician',
        'Date',
        'StartTime',
        'EndTime',
    ];

    return (
        <main className='rounded-2xl bg-slate-100 p-5 font-mono uppercase text-slate-800'>
            <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
                <Search />
                <CreateAppointment />
            </div>
            <ResultsTable
                searchFields={searchFields}
                resultFields={resultFields}
                getFcn={getAppts}
                UpdateButton={UpdateAppointment}
                DeleteButton={DeleteAppointment}
            />
        </main>
    );
}
