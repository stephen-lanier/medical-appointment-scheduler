import { PhysicianSearch } from '@/app/ui/appointments/create/search';
import { PhysicianTable } from '@/app/ui/appointments/create/table';


export default async function Page({ searchParams }) {

    const physicianName = searchParams?.query || '';

    return (
        <main className="font-mono text-slate-800 p-5 bg-slate-100 rounded-2xl uppercase">
            <h1 className="block-inline uppercase tracking-widest text-3xl p-10">Select a physician</h1>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <PhysicianSearch physicianName={physicianName} />
            </div>
            <PhysicianTable query={physicianName} />
        </main>
    );
}
