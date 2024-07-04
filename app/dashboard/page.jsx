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
  getSpecialtyCounts,
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
    <main className='h-full w-full px-5 font-mono uppercase text-slate-800'>
      <div className='flex flex-row justify-between'>
        <Tile
          title={'Patients'}
          data={patientsCount.total}
          className={
            'm-5 h-48 w-1/5 justify-center rounded-2xl bg-slate-100 p-5'
          }
        />
        <Tile
          title={'Physicians'}
          data={physicianCount.total}
          className={
            'm-5 h-48 w-1/5 justify-center rounded-2xl bg-slate-100 p-5'
          }
        />
        <Tile
          title={'Specialties'}
          data={specializationCount.total}
          className={
            'm-5 h-48 w-1/5 justify-center rounded-2xl bg-slate-100 p-5'
          }
        />
        <Tile
          title={'Appointments'}
          data={appointmentCount.total}
          className={
            'm-5 h-48 w-1/5 justify-center rounded-2xl bg-slate-100 p-5'
          }
        />
      </div>
      <div className='m-5 flex flex-row justify-center rounded-2xl bg-slate-100 p-5'>
        <CalendarReport data={appointments} />
      </div>
      <div className='m-5 flex flex-row justify-center rounded-2xl bg-slate-100 p-5'>
        <SpecializationCounts data={specialtyCounts} />
      </div>
      <div className='flex h-fit w-full flex-row justify-between'>
        <AppointmentsByDayOfWeek
          data={appointmentsVsDOW}
          className={'m-5 w-1/2 justify-center rounded-2xl bg-slate-100 p-5'}
        />
        <AppointmentByAgeReport
          data={appointmentsVsAge}
          className={'m-5 w-1/2 justify-center rounded-2xl bg-slate-100 p-5'}
        />
      </div>
    </main>
  );
}
