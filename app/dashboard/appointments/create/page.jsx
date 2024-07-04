import { PatientSearch } from '@/app/ui/appointments/create/search';
import { PatientTable } from '@/app/ui/appointments/create/table';

export default async function Page({ searchParams }) {
  const patientName = searchParams?.query || '';

  return (
    <main className='rounded-2xl bg-slate-100 p-5 font-mono uppercase text-slate-800'>
      <h1 className='block-inline p-10 text-3xl uppercase tracking-widest'>
        Select a patient
      </h1>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <PatientSearch patientName={patientName} />
      </div>
      <PatientTable query={patientName} />
    </main>
  );
}
