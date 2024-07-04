import Search from '../../ui/patients/search';
import Table from '../../ui/patients/table';
import { CreatePatient } from '@/app/ui/patients/buttons';

export default async function Page({ searchParams }) {
  const patientName = searchParams?.query || '';

  return (
    <main className='rounded-2xl bg-slate-100 p-5 font-mono uppercase text-slate-800'>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <Search name={patientName} />
        <CreatePatient />
      </div>
      <Table query={patientName} />
    </main>
  );
}
