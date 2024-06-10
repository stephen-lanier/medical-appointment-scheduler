import clsx rom 'clsx';

export default function Button({ children, className, ...rest }) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-slate-500 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 font-mono uppercase',
        className,
      )}
    >
      {children}
    </button>
  );
}
