import Search from '../../ui/physicians/search';
import ResultsTable from '@/app/ui/results-table';
import {
    CreatePhysician,
    UpdatePhysician,
    DeletePhysician,
} from '@/app/ui/physicians/buttons';
import { getPhysicians } from '@/app/server';

export default async function Page({ searchParams }) {
    const physicianName = searchParams?.physician || '';
    const specialization = searchParams?.specialization || '';
    const contact = searchParams?.contact || '';
    const searchFields = [physicianName, specialization, contact];
    const resultFields = ['ID', 'Physician', 'Specialization', 'Contact Info'];

    return (
        <main className='rounded-2xl bg-slate-100 p-5 font-mono uppercase text-slate-800'>
            <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
                <Search />
                <CreatePhysician />
            </div>
            <ResultsTable
                searchFields={searchFields}
                resultFields={resultFields}
                getFcn={getPhysicians}
                UpdateButton={UpdatePhysician}
                DeleteButton={DeletePhysician}
            />
        </main>
    );
}
