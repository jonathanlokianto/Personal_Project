export default function SubNavbar() {
    return (
        <>
            <form className="flex items-end gap-6 bg-white p-4 w-full shadow-sm">
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                        Include
                    </span>
                    <input
                        type="text"
                        placeholder="Include tags..."
                        className="border rounded px-2 py-1 focus:outline-blue-500"
                    />
                </div>

                {/* 2. Bagian Exclude */}
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                        Exclude
                    </span>
                    <input
                        type="text"
                        placeholder="Exclude tags..."
                        className="border rounded px-2 py-1 focus:outline-red-500"
                    />
                </div>

                {/* 3. Bagian Search (Paling lebar) */}
                <div className="flex flex-col grow">
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                        Search
                    </span>
                    <div className="flex items-center gap-6">
                        <input
                            type="search"
                            placeholder="Search agenda..."
                            className="border rounded-l px-3 py-1 w-full focus:outline-blue-500"
                        />
                        <button className="bg-blue-600 text-white px-4 py-1 rounded-r hover:bg-blue-700 transition-colors rounded">
                            Search
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
