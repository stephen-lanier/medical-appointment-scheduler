import Image from "next/image";
import { getCourses, getRegistrations } from "./server";

export default async function Home() {

    let coursesData = await getCourses();
    let registrationsData = await getRegistrations();

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
                <h1 className="block-inline uppercase tracking-widest text-3xl p-10">Courses</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-5">
                    <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className=" text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 p-0">
                            <tr>
                                <th scope='col' className='px-6 py-3'>Course ID</th>
                                <th scope='col' className='px-6 py-3'>Course Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coursesData.map(x => {
                                return (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className='px-6 py-3'>{x.course_id}</td>
                                    <td className='px-6 py-3'>{x.subject_name}</td>
                                </tr>);
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="py-10">
                <h1 className="block-inline uppercase tracking-widest text-3xl p-10">Registrations</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-5">
                    <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className=" text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 p-0">
                            <tr>
                                <th scope='col' className='px-6 py-3'>Student ID</th>
                                <th scope='col' className='px-6 py-3'>Group ID</th>
                                <th scope='col' className='px-6 py-3'>Date</th>
                                <th scope='col' className='px-6 py-3'>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrationsData.map(x => {
                                return (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className='px-6 py-3'>{x.student_id}</td>
                                    <td className='px-6 py-3'>{x.group_id}</td>
                                    <td className='px-6 py-3'>{`${x.date}`}</td>
                                    <td className='px-6 py-3'>{x.time}</td>
                                </tr>);
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </main>
    );
}
