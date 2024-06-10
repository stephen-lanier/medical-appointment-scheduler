import { CalendarReport } from '@/app/ui/dashboard/reports/calendar';
import { AppointmentByAgeReport } from '@/app/ui/dashboard/reports/age-appointments';
import Tile from '@/app/ui/dashboard/reports/tile';
import { AppointmentsByDayOfWeek } from '@/app/ui/dashboard/reports/day-of-week';
import { SpecializationCounts } from '@/app/ui/dashboard/reports/specialties';
import { 
    getApptCounts, 
    getAgesAppointments, 
    getPatientCount, 
    getPhysicianCount, 
    getSpecializationCount, 
    getAppointmentCount,
    getAppointmentsByDayofWeek,
    getSpecialtyCounts
} from '@/app/server';

export default async function Page() {

    
    const appointments = await getApptCounts();
    const appointmentsVsAge = await getAgesAppointments();
    const appointmentsVsDOW = await getAppointmentsByDayofWeek();
    const patientsCount = await getPatientCount();
    const physicianCount = await getPhysicianCount();
    const specializationCount = await getSpecializationCount();
    const appointmentCount = await getAppointmentCount();
    const specialtyCounts = await getSpecialtyCounts();

    return (
        <main className="text-slate-800 px-5 font-mono uppercase w-full h-full">
            <div className='flex flex-row justify-between'>
                <Tile title={'Patients'} data={patientsCount.total} className={'bg-slate-100 m-5 p-5 rounded-2xl w-1/5 h-48 justify-center'}/>
                <Tile title={'Physicians'} data={physicianCount.total} className={'bg-slate-100 m-5 p-5 rounded-2xl w-1/5 h-48 justify-center'}/>
                <Tile title={'Specialties'} data={specializationCount.total} className={'bg-slate-100 m-5 p-5 rounded-2xl w-1/5 h-48 justify-center'}/>
                <Tile title={'Appointments'} data={appointmentCount.total} className={'bg-slate-100 m-5 p-5 rounded-2xl w-1/5 h-48 justify-center'}/>
            </div>
            <div className="flex flex-row justify-center bg-slate-100 m-5 p-5 rounded-2xl">
                <CalendarReport data={appointments} />
            </div>
            <div className="flex flex-row justify-center bg-slate-100 m-5 p-5 rounded-2xl">
                <SpecializationCounts data={specialtyCounts} />
            </div>
            <div className="flex flex-row justify-between h-fit w-full">
                <AppointmentsByDayOfWeek data={appointmentsVsDOW} className={'bg-slate-100 m-5 p-5 rounded-2xl w-1/2 justify-center'} />
                <AppointmentByAgeReport data={appointmentsVsAge} className={'bg-slate-100 m-5 p-5 rounded-2xl w-1/2 justify-center'}/>
            </div>
        </main>
    );
}
