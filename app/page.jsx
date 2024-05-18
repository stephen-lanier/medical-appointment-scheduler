import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default async function Home() {
    return (
        <main className="flex min-h-screen flex-col p-6 font-mono uppercase">
            <div className="flex h-20 shrink-0 items-end justify-end rounded-lg bg-slate-400 p-4 md:h-52">
                <Image src="/next.svg"
                    alt="nextjs Logo"
                    className="dark:invert invert"
                    width={100}
                    height={24}
                    priority
                />
            </div>
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
                    {/* <div className={styles.shape} /> */}
                    <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal font-mono lowercase`}>
                        <strong>Medical Appointment Scheduler</strong> - E Team - CPSC 5021 - Spring 2024
                    </p>
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-5 self-start rounded-lg bg-slate-400 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-300 md:text-base tracking-widest"
                    >
                        <span>Log in</span>
                        <ArrowRightIcon className="w-5 md:w-6 stroke-2" />
                    </Link>
                </div>
                <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
                    {/* <Image
                        src="/hero-desktop.png"
                        width={1000}
                        height={760}
                        className="hidden md:block"
                        alt="Screenshots of the dashboard project showing desktop version"
                    />
                    <Image
                        src="/hero-mobie.png"
                        width={560}
                        height={620}
                        alt="Screenshots of the dashboard project showing desktop version"
                    /> */}
                </div>
            </div>
        </main>
    );
}
