import { getAppts, getPatientName } from "../../server";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Search from '../../ui/appointments/search';
import Table from '../../ui/appointments/table';


export default async function Page({ searchParams }) {

    const patientName = searchParams?.query || '';

    return (
        <main className="font-mono text-slate-800 p-5 bg-slate-50 uppercase">
            <Search patientName={patientName} />
            <Table query={patientName} />
        </main>
    );
}
