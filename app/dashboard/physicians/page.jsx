import Search from '../../ui/physicians/search';
import Table from '../../ui/physicians/table';
import { CreatePhysician } from '@/app/ui/physicians/buttons';


export default async function Page({ searchParams }) {

    const physicianName = searchParams?.query || '';

    return (
        <main className="font-mono text-slate-800 p-5 bg-slate-50 rounded-2xl uppercase">
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search name={physicianName} />
            <CreatePhysician />
            </div>
            <Table query={physicianName} />
        </main>
    );
}
