import Image from "next/image";
import { getAppts, getPatientName } from "../server";

export default async function Dashboard() {

    let patientID = 1;
    let apptsData = await getAppts(patientID);
    let patientName = await getPatientName(patientID);

    return (
        <main className="font-mono text-slate-800 p-5 bg-slate-50 uppercase">
            <div className="flex">
                <h1>Dashboard</h1>
            </div>
        </main>
    );
}