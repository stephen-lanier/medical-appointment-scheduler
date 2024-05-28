export default function Page({ params }) {

    const id = params.id;

    return (
        <main className="font-mono text-slate-800 p-5 bg-slate-50 uppercase">
            <div className="flex">
                <h1>Edit patient with ID: {id}</h1>
            </div>
        </main>
    );
}