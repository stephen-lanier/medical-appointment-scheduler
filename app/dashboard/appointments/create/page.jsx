import Search from '@/app/ui/appointments/create/search';
import Table from '@/app/ui/appointments/create/table';
import { Next } from '@/app/ui/appointments/create/buttons';


export default async function Page({ searchParams }) {

    const patientName = searchParams?.query || '';

    return (
        <main className="font-mono text-slate-800 p-5 bg-slate-50 uppercase">
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search patientName={patientName} />
            </div>
            <Table query={patientName} />
        </main>
    );
}