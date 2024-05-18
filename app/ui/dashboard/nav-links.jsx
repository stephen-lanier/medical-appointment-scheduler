'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Create', href: '/dashboard/create' },
    { name: 'Cancel', href: '/dashboard/cancel' }
    // {
    //     name: 'Invoices',
    //     href: '/dashboard/invoices',
    // },
    // { name: 'Customers', href: '/dashboard/customers' },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
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
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
