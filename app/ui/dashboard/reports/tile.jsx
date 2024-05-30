'use client';

import clsx from "clsx";

export default function Tile({ title, data, className }) {
    return (
        <div className={clsx('flex flex-col', className)}>
            <p className="flex flex-1 justify-center items-center font-extrabold text-5xl">{data}</p>
            <p className="flex justify-center text-slate-500">{title}</p>
        </div>
    );
}