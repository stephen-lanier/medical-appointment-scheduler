import Search from '../../ui/vacations/search';
import Table from '../../ui/vacations/table';
import { CreateVacation } from '@/app/ui/vacations/buttons';

export default async function Page({ searchParams }) {
  const physicianName = searchParams?.query || '';

  return (
    <main className='rounded-2xl bg-slate-100 p-5 font-mono uppercase text-slate-800'>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <Search physicianName={physicianName} />
        <CreateVacation />
      </div>
      <Table query={physicianName} />
    </main>
  );
}
