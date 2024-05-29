import { getVacations } from "@/app/server";
import { UpdateVacation, DeleteVacation } from "./buttons";

export default async function Table({ query }) {

    const vacationsData = await getVacations(query);

    return (
        <div className="py-10">
            <h1 className="block-inline uppercase tracking-widest text-3xl p-10">Vacations for <b>{query}</b></h1>
            <div className="relative overflow-auto shadow-md sm:rounded-lg mx-5 max-h-96">
                <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className=" text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 p-0">
                        <tr>
                            <th scope='col' className='px-6 py-3 tracking-widest'>Physician</th>
                            <th scope='col' className='px-6 py-3 tracking-widest'>Start Date</th>
                            <th scope='col' className='px-6 py-3 tracking-widest'>End Date</th>
                            <th scope='col' className='px-6 py-3 tracking-widest'>Description</th>
                            <th scope='col' className='px-6 py-3 tracking-widest'>Status</th>
                            <th scope="col" className="relative py-3 pl-6 pr-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacationsData.map(x => {
                            return (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className='px-6 py-3'>{x.PhysicianID}: {x.Name}</td>
                                <td className='px-6 py-3'>{x.StartDate.toDateString()}</td>
                                <td className='px-6 py-3'>{x.EndDate.toDateString()}</td>
                                <td className='px-6 py-3'>{x.Reason}</td>
                                <td className='px-6 py-3'>{x.VacationStatus}</td>
                                {/* <td className='px-6 py-3'>{x.AppointmentStatus}</td> */}
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    <div className="flex justify-end gap-3">
                                        <UpdateVacation id={x.VacationID} />
                                        <DeleteVacation id={x.VacationID} />
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