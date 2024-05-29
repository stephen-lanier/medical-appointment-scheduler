'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { 
    ChartBarIcon, 
    TableCellsIcon, 
    ClipboardDocumentListIcon, 
    CalendarDaysIcon, 
    GlobeAsiaAustraliaIcon, 
    UserIcon, 
    BuildingStorefrontIcon 
} from '@heroicons/react/24/outline'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    { name: 'Appointments', href: '/dashboard/appointments', icon: CalendarDaysIcon },
    { name: 'Vacations', href: '/dashboard/vacations', icon: GlobeAsiaAustraliaIcon },
    { name: 'Patients', href: '/dashboard/patients', icon: UserIcon },
    { name: 'Physicians', href: '/dashboard/physicians', icon: ClipboardDocumentListIcon }
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-slate-200 hover:text-slate-600 md:flex-none md:justify-start md:p-2 md:px-3 uppercase font-mono',
                            {
                                'bg-slate-200 text-slate-600': pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className='w-6'/>
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
