import { useForm } from "@inertiajs/react";

// Jangan lupa menangkap props onClose dari Index.jsx
export default function SettingModal({ innerModalAreaRef, onClose }) {
    // Menggunakan useForm dari Inertia untuk mengelola state form dengan mudah
    const { data, setData, post, processing } = useForm({
        preset_name: "",
        model_name: "",
        proxy_url: "",
        api_key: "",
        custom_prompt: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Nanti Anda bisa mengganti route-nya sesuai kebutuhan backend Anda
        console.log("Menyimpan pengaturan: ", data);
        // post(route('settings.store'), { onSuccess: () => onClose() });
    };

    return (
        <div className="flex items-center justify-center inset-0 fixed z-50 bg-black/50 backdrop-blur-sm">
            <div
                className="bg-gray-800 outline-3 outline-white flex flex-col
                           h-[600px] w-[500px] max-w-[90vw] max-h-[90vh]
                           rounded-2xl overflow-hidden shadow-2xl"
                ref={innerModalAreaRef}
            >
                {/* START HEADER */}
                <div className="w-full relative flex items-center justify-center pt-5 pb-3">
                    <h2 className="text-lg font-bold text-gray-100 tracking-wider">
                        CHAT SETTINGS
                    </h2>
                    <button
                        onClick={onClose} // Berfungsi untuk menutup modal
                        className="absolute right-5 text-gray-400 hover:text-red-500 font-bold transition-colors text-xl"
                    >
                        ✕
                    </button>
                </div>
                <hr className="w-11/12 border-gray-600 mx-auto rounded-sm mb-4" />
                {/* END HEADER */}

                {/* START FORM AREA */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col grow overflow-hidden"
                >
                    {/* Area yang bisa di-scroll */}
                    <div className="flex flex-col gap-5 px-8 pb-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                        
                        {/* Input 1: Preset Name */}
                        <label className="flex flex-col gap-1.5">
                            <span className="text-sm font-semibold text-gray-300">Preset Name</span>
                            <input
                                type="text"
                                className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                placeholder="e.g. My Custom AI"
                                value={data.preset_name}
                                onChange={(e) => setData("preset_name", e.target.value)}
                            />
                        </label>

                        {/* Input 2: Model Name */}
                        <label className="flex flex-col gap-1.5">
                            <span className="text-sm font-semibold text-gray-300">Model Name</span>
                            <input
                                type="text"
                                className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                placeholder="e.g. gpt-4-turbo"
                                value={data.model_name}
                                onChange={(e) => setData("model_name", e.target.value)}
                            />
                        </label>

                        {/* Input 3: Proxy URL */}
                        <label className="flex flex-col gap-1.5">
                            <span className="text-sm font-semibold text-gray-300">Proxy URL</span>
                            <input
                                type="url"
                                className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                placeholder="e.g. https://openrouter.ai/api/v1"
                                value={data.proxy_url}
                                onChange={(e) => setData("proxy_url", e.target.value)}
                            />
                        </label>

                        {/* Input 4: API Key */}
                        <label className="flex flex-col gap-1.5">
                            <span className="text-sm font-semibold text-gray-300">API Key</span>
                            <input
                                type="password"
                                className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                placeholder="sk-..."
                                value={data.api_key}
                                onChange={(e) => setData("api_key", e.target.value)}
                            />
                        </label>

                        {/* Input 5: Custom Prompt */}
                        <label className="flex flex-col gap-1.5">
                            <span className="text-sm font-semibold text-gray-300">Custom Prompt (System)</span>
                            <textarea
                                className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
                                rows={4}
                                placeholder="Override the system prompt for this proxy..."
                                value={data.custom_prompt}
                                onChange={(e) => setData("custom_prompt", e.target.value)}
                            />
                        </label>
                    </div>

                    {/* START FOOTER (Sticky Tombol Save) */}
                    <div className="p-4 bg-gray-800 border-t border-gray-700 flex justify-end gap-3 mt-auto">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg font-medium text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-colors shadow-md"
                        >
                            {processing ? "Saving..." : "Save Settings"}
                        </button>
                    </div>
                    {/* END FOOTER */}
                </form>
                {/* END FORM AREA */}
            </div>
        </div>
    );
}