import { getPatients } from "@/app/server";
import { Select } from "./buttons";

export default async function Table({ query }) {

    const patientsData = await getPatients(query);

    return (
        <div className="py-10">
            <h1 className="block-inline uppercase tracking-widest text-3xl p-10">Patients with names like <b>{query}</b></h1>
            <div className="relative overflow-auto shadow-md sm:rounded-lg mx-5 max-h-96">
                <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className=" text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 p-0">
                        <tr>
                            <th scope='col' className='px-6 py-3 tracking-widest'>Patient</th>
                            <th scope='col' className='px-6 py-3 tracking-widest'>Date of Birth</th>
                            <th scope='col' className='px-6 py-3 tracking-widest'>Contact Info</th>
                            <th scope="col" className="relative py-3 pl-6 pr-3">
                                <span className="sr-only">Select</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientsData.map(x => {
                            return (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className='px-6 py-3'>{x.PatientID}: {x.Name}</td>
                                <td className='px-6 py-3'>{x.DOB.toDateString()}</td>
                                <td className='px-6 py-3'>{x.ContactInfo}</td>
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    <div className="flex justify-end gap-3">
                                        <Select id={x.PatientID} />
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