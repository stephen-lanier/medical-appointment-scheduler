import Search from '../../ui/vacations/search';
import ResultsTable from '@/app/ui/results-table';
import { getVacations } from '@/app/server';
import {
    CreateVacation,
    UpdateVacation,
    DeleteVacation,
} from '@/app/ui/vacations/buttons';
import { ClockIcon, CheckIcon } from '@heroicons/react/24/outline';

export default async function Page({ searchParams }) {
    const physicianName = searchParams?.physician || '';
    const date = searchParams?.date || '';
    const status = searchParams?.status || '';
    const searchFields = [physicianName, date, status];
    const resultFields = [
        'ID',
        'Physician',
        'StartDate',
        'EndDate',
        'Description',
        'Status',
    ];

    return (
        <main className='rounded-2xl bg-slate-100 p-5 font-mono uppercase text-slate-800'>
            <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
                <Search />
                <CreateVacation />
            </div>
            <ResultsTable
                searchFields={searchFields}
                resultFields={resultFields}
                getFcn={getVacations}
                UpdateButton={UpdateVacation}
                DeleteButton={DeleteVacation}
            />
        </main>
    );
}
/*
                  <td className='px-6 py-3'>
                    {x.VacationStatus == 'pending' ? (
                      <span className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600'>
                        Pending <ClockIcon className='h-4 w-4' />
                      </span>
                    ) : (
                      <span className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white'>
                        Approved <CheckIcon className='h-4 w-4' />
                      </span>
                    )}
                  </td>
*/
