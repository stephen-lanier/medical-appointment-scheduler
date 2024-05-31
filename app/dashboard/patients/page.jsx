import Search from '../../ui/patients/search';
import Table from '../../ui/patients/table';
import { CreatePatient } from '@/app/ui/patients/buttons';


export default async function Page({ searchParams }) {

    const patientName = searchParams?.query || '';

    return (
        <main className="font-mono text-slate-800 p-5 bg-slate-50 uppercase">
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search name={patientName} />
            <CreatePatient />
            </div>
            <Table query={patientName} />
        </main>
    );
}
