import Search from '../../ui/patients/search';
import ResultsTable from '@/app/ui/results-table';
import {
    CreatePatient,
    UpdatePatient,
    DeletePatient,
} from '@/app/ui/patients/buttons';
import { getPatients } from '@/app/server';

export default async function Page({ searchParams }) {
    const patientName = searchParams?.patient || '';
    const dob = searchParams?.dob || '';
    const contact = searchParams?.contact || '';
    const searchFields = [patientName, dob, contact];
    const resultFields = ['ID', 'Patient', 'Date of Birth', 'Contact Info'];

    return (
        <main className='rounded-2xl bg-slate-100 p-5 font-mono uppercase text-slate-800'>
            <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
                <Search />
                <CreatePatient />
            </div>
            <ResultsTable
                searchFields={searchFields}
                resultFields={resultFields}
                getFcn={getPatients}
                UpdateButton={UpdatePatient}
                DeleteButton={DeletePatient}
            />
        </main>
    );
}
