import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col p-6 font-mono uppercase'>
      <div className='flex h-20 shrink-0 items-end justify-end rounded-lg bg-slate-400 p-4 md:h-52'>
        <Image
          src='/next.svg'
          alt='nextjs Logo'
          className='invert dark:invert'
          width={100}
          height={24}
          priority
        />
      </div>
      <div className='mt-4 flex w-full grow flex-col items-center justify-center gap-4 rounded-2xl bg-gray-50'>
        <div className='flex w-2/3 flex-col justify-center gap-6  rounded-lg px-6 py-10'>
          {/* <div className={styles.shape} /> */}
          <p
            className={`flex font-mono text-xl lowercase text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Medical Appointment Scheduler</strong>
          </p>
          <p
            className={`flex font-mono text-xl lowercase text-gray-800 md:text-3xl md:leading-normal`}
          >
            E Team
          </p>
          <p
            className={`flex font-mono text-xl lowercase text-gray-800 md:text-3xl md:leading-normal`}
          >
            CPSC 5021
          </p>
          <p
            className={`flex font-mono text-xl lowercase text-gray-800 md:text-3xl md:leading-normal`}
          >
            Spring 2024
          </p>
          <Link
            href='/dashboard'
            className='flex items-center gap-5 self-start rounded-lg bg-slate-400 px-6 py-3 text-sm font-medium tracking-widest text-white transition-colors hover:bg-slate-300 md:text-base'
          >
            <span>Log in</span>
            <ArrowRightIcon className='w-5 stroke-2 md:w-6' />
          </Link>
        </div>
        {/* <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12"> */}
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
        {/* </div> */}
      </div>
    </main>
  );
}
