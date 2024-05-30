import { CalendarReport } from '@/app/ui/dashboard/reports/calendar';
import { getApptCounts } from '@/app/server';

export default async function Page() {

    const appointments = await getApptCounts();

    return (
        <main className="font-mono text-slate-800 p-5 bg-slate-50 uppercase">
            <div className='flex m-10'>
                <h1>Dashboard</h1>
            </div>
            <div className="flex justify-center">
                <CalendarReport data={appointments}/>
            </div>
        </main>
    );
}