import clsx from 'clsx';

export default function Button({ children, className, ...rest }) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-slate-500 px-4 font-mono text-sm font-medium uppercase text-white transition-colors hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600',
        className
      )}
    >
      {children}
    </button>
  );
}
