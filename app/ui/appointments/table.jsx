import { getAppts } from "@/app/server";
import { UpdateAppointment, DeleteAppointment } from "./buttons";

export default async function Table({ patient, physician, date }) {

    const apptsData = await getAppts(patient, physician, date);

    return (
        <div className="py-10">
            <h1 className="block-inline uppercase tracking-widest text-3xl p-10">Appointments for <b>{patient}</b></h1>
            <div className="relative overflow-auto shadow-md sm:rounded-lg mx-5 max-h-96">
                <table className="w-full text-base text-left rtl:text-right text-gray-500">
                    <thead className=" text-gray-700 uppercase bg-gray-200 p-0">
                        <tr>
                            <th scope='col' className='px-6 py-3 tracking-widest'>Patient</th>
                            <th scope='col' className='px-6 py-3 tracking-widest'>Physician</th>
                            <th scope='col' className='px-6 py-3 tracking-widest'>Date</th>
                            <th scope='col' className='px-6 py-3 tracking-widest'>Start Time</th>
                            <th scope='col' className='px-6 py-3 tracking-widest'>End Time</th>
                            {/* <th scope='col' className='px-6 py-3 tracking-widest'>Status</th> */}
                            <th scope="col" className="relative py-3 pl-6 pr-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {apptsData.map(x => {
                            return (<tr className="bg-white border-b">
                                <td className='px-6 py-3'>{x.PatientID}: {x.PatientName}</td>
                                <td className='px-6 py-3'>{x.PhysicianID}: {x.PhysicianName}</td>
                                <td className='px-6 py-3'>{x.Date.toDateString()}</td>
                                <td className='px-6 py-3'>{x.StartTime}</td>
                                <td className='px-6 py-3'>{x.EndTime}</td>
                                {/* <td className='px-6 py-3'>{x.AppointmentStatus}</td> */}
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    <div className="flex justify-end gap-3">
                                        <UpdateAppointment id={x.AppointmentID} />
                                        <DeleteAppointment id={x.AppointmentID} />
                                    </div>
                                </td>
                            </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
