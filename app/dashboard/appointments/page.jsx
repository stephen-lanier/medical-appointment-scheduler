import Search from '../../ui/appointments/search';
import Table from '../../ui/appointments/table';
import { CreateAppointment } from '@/app/ui/appointments/buttons';

export default async function Page({ searchParams }) {
  const patientName = searchParams?.patient || '';
  const physicianName = searchParams?.physician || '';
  const date = searchParams?.date || '';

  return (
    <main className='rounded-2xl bg-slate-100 p-5 font-mono uppercase text-slate-800'>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <Search />
        <CreateAppointment />
      </div>
      <Table patient={patientName} physician={physicianName} date={date} />
    </main>
  );
}
