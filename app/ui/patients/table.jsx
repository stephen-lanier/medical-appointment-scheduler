import { getPatients } from '@/app/server';
import { UpdatePatient, DeletePatient } from './buttons';

export default async function Table({ query }) {
  const patientsData = await getPatients(query);

  return (
    <div className='py-10'>
      <h1 className='block-inline p-10 text-3xl uppercase tracking-widest'>
        Patients with names like <b>{query}</b>
      </h1>
      <div className='relative mx-5 max-h-96 overflow-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-base text-gray-500 rtl:text-right'>
          <thead className=' bg-slate-300 uppercase text-gray-700'>
            <tr>
              <th scope='col' className='px-6 py-3 tracking-widest'>
                Patient
              </th>
              <th scope='col' className='px-6 py-3 tracking-widest'>
                Date of Birth
              </th>
              <th scope='col' className='px-6 py-3 tracking-widest'>
                Contact Info
              </th>
              <th scope='col' className='relative py-3 pl-6 pr-3'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {patientsData.map((x) => {
              return (
                <tr className='border-b bg-white'>
                  <td className='px-6 py-3'>
                    {x.PatientID}: {x.Name}
                  </td>
                  <td className='px-6 py-3'>{x.DOB.toDateString()}</td>
                  <td className='px-6 py-3'>{x.ContactInfo}</td>
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex justify-end gap-3'>
                      <UpdatePatient id={x.PatientID} />
                      <DeletePatient id={x.PatientID} />
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
