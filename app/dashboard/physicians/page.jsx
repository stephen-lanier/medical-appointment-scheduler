import Search from '../../ui/physicians/search';
import Table from '../../ui/physicians/table';
import { CreatePhysician } from '@/app/ui/physicians/buttons';

export default async function Page({ searchParams }) {
  const physicianName = searchParams?.physician || '';
  const specialization = searchParams?.specialization || '';
  const contact = searchParams?.contact || '';

  return (
    <main className='rounded-2xl bg-slate-100 p-5 font-mono uppercase text-slate-800'>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <Search />
        <CreatePhysician />
      </div>
      <Table
        physician={physicianName}
        specialization={specialization}
        contact={contact}
      />
    </main>
  );
}
