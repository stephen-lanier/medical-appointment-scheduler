import Image from "next/image";
import { getAppts, getPatientName } from "./server";

export default async function Home() {

    let patientID = 1;
    let apptsData = await getAppts(patientID);
    let patientName = await getPatientName(patientID);

    return (
        <main className="font-mono text-slate-800 p-5 bg-slate-50">
            <div className="">
                <div className="">
                    <a
                        className=""
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        built with{" "}
                        <Image
                            src="/next.svg"
                            alt="nextjs Logo"
                            className="dark:invert"
                            width={100}
                            height={24}
                            priority
                        />
                    </a>
                </div>
            </div>


            <div className="py-10">
                <h1 className="block-inline uppercase tracking-widest text-3xl p-10">Appointments for <b>{patientName}</b></h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-5">
                    <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className=" text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 p-0">
                            <tr>
                                <th scope='col' className='px-6 py-3 tracking-widest'>Physician</th>
                                <th scope='col' className='px-6 py-3 tracking-widest'>Date</th>
                                <th scope='col' className='px-6 py-3 tracking-widest'>Start Time</th>
                                <th scope='col' className='px-6 py-3 tracking-widest'>End Time</th>
                                <th scope='col' className='px-6 py-3 tracking-widest'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apptsData.map(x => {
                                return (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className='px-6 py-3'>{x.PhysicianID}: {x.Name}</td>
                                    <td className='px-6 py-3'>{x.Date.toDateString()}</td>
                                    <td className='px-6 py-3'>{x.StartTime}</td>
                                    <td className='px-6 py-3'>{x.EndTime}</td>
                                    <td className='px-6 py-3'>{x.AppointmentStatus}</td>
                                </tr>);
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
