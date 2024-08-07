import { getPhysicians, getPatients } from '@/app/server';
import { SelectPatient, SelectPhysician } from './buttons';

export async function PatientTable({ query }) {
  const patientsData = await getPatients(query);

  return (
    <div className='py-10'>
      <div className='relative mx-5 max-h-96 overflow-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-base text-gray-500 rtl:text-right'>
          <thead className=' bg-slate-300 p-0 uppercase text-gray-700'>
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
                <span className='sr-only'>Select</span>
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
                      <SelectPatient patientID={x.PatientID} />
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

export async function PhysicianTable({ query }) {
  const physicianData = await getPhysicians(query);

  return (
    <div className='py-10'>
      <h1 className='block-inline p-10 text-3xl uppercase tracking-widest'>
        Physicians with names like <b>{query}</b>
      </h1>
      <div className='relative mx-5 max-h-96 overflow-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-base text-gray-500 rtl:text-right'>
          <thead className=' bg-slate-300 p-0 uppercase text-gray-700'>
            <tr>
              <th scope='col' className='px-6 py-3 tracking-widest'>
                Physician
              </th>
              <th scope='col' className='px-6 py-3 tracking-widest'>
                Specialization
              </th>
              <th scope='col' className='px-6 py-3 tracking-widest'>
                Contact Info
              </th>
              <th scope='col' className='relative py-3 pl-6 pr-3'>
                <span className='sr-only'>Select</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {physicianData.map((x) => {
              return (
                <tr className='border-b bg-white'>
                  <td className='px-6 py-3'>
                    {x.PhysicianID}: {x.Name}
                  </td>
                  <td className='px-6 py-3'>{x.Description}</td>
                  <td className='px-6 py-3'>{x.ContactInfo}</td>
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex justify-end gap-3'>
                      <SelectPhysician physicianID={x.PhysicianID} />
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
