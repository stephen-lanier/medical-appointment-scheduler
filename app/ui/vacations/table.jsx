import { getVacations } from '@/app/server';
import { UpdateVacation, DeleteVacation } from './buttons';
import { ClockIcon, CheckIcon } from '@heroicons/react/24/outline';

export default async function Table({ query }) {
  const vacationsData = await getVacations(query);

  return (
    <div className='py-10'>
      <h1 className='block-inline p-10 text-3xl uppercase tracking-widest'>
        Vacations for <b>{query}</b>
      </h1>
      <div className='relative mx-5 max-h-96 overflow-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-base text-gray-500 rtl:text-right'>
          <thead className=' bg-slate-300 uppercase text-gray-700'>
            <tr>
              <th scope='col' className='px-6 py-3 tracking-widest'>
                Physician
              </th>
              <th scope='col' className='px-6 py-3 tracking-widest'>
                Start Date
              </th>
              <th scope='col' className='px-6 py-3 tracking-widest'>
                End Date
              </th>
              <th scope='col' className='px-6 py-3 tracking-widest'>
                Description
              </th>
              <th scope='col' className='px-6 py-3 tracking-widest'>
                Status
              </th>
              <th scope='col' className='relative py-3 pl-6 pr-3'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {vacationsData.map((x) => {
              return (
                <tr className='border-b bg-white'>
                  <td className='px-6 py-3'>
                    {x.PhysicianID}: {x.Name}
                  </td>
                  <td className='px-6 py-3'>{x.StartDate.toDateString()}</td>
                  <td className='px-6 py-3'>{x.EndDate.toDateString()}</td>
                  <td className='px-6 py-3'>{x.Reason}</td>
                  <td className='px-6 py-3'>
                    {x.VacationStatus == 'pending' ? (
                      <span className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600'>
                        Pending <ClockIcon className='h-4 w-4' />
                      </span>
                    ) : (
                      <span className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white'>
                        Approved <CheckIcon className='h-4 w-4' />
                      </span>
                    )}
                  </td>
                  {/* <td className='px-6 py-3'>{x.AppointmentStatus}</td> */}
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex justify-end gap-3'>
                      <UpdateVacation id={x.VacationID} />
                      <DeleteVacation id={x.VacationID} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
