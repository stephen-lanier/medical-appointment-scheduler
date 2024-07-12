export default async function ResultsTable({
    searchFields,
    resultFields,
    getFcn,
    UpdateButton,
    DeleteButton,
}) {
    const dataset = await getFcn(...searchFields);
    return (
        <div className='py-10'>
            <h1 className='block-inline p-10 text-3xl uppercase tracking-widest'>
                Appointments for <b>{...searchFields}</b>
            </h1>
            <div className='relative mx-5 max-h-96 overflow-auto shadow-md sm:rounded-lg'>
                <table className='w-full text-left text-base text-gray-500 rtl:text-right'>
                    <thead className=' bg-slate-300 p-0 uppercase text-gray-700'>
                        <tr>
                            {resultFields.map((field) => {
                                return (
                                    <th scope='col' className='px-6 py-3 tracking-widest'>
                                        {field}
                                    </th>
                                );
                            })}
                            <th scope='col' className='relative py-3 pl-6 pr-3'>
                                <span className='sr-only'>Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataset.map((x) => {
                            return (
                                <tr className='border-b bg-white'>
                                    {resultFields.map((field) => {
                                        return (
                                            <td className='px-6 py-3'>
                                                {field === 'Date' ? x[field].toDateString() : x[field]}
                                            </td>
                                        );
                                    })}
                                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                                        <div className='flex justify-end gap-3'>
                                            <UpdateButton id={x.ID} />
                                            <DeleteButton id={x.ID} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
