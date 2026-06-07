import { router, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function TypeBubble({ onMessageSend }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        message_content: "",
        role: "user",
    });

    const messageOnSend = (e) => {
        e.preventDefault();
        if (!data.message_content.trim() || processing) return;

        // if (onMessageSend) {
        //     onMessageSend(data.message_content);
        //     reset("message_content");
        //     return;
        // }

        post(route("chatbot.store"), {
            preserveScroll: true,
            onSuccess: () => {
                if (onMessageSend) {
                    onMessageSend(data.message_content);
                }
                reset("message_content");
            },
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            messageOnSend(e);
        }
    };

    return (
        <div
            id="typeBase"
            className="flex sticky bottom-6 mx-auto 
                        w-full h-fit
                       bg-slate-700 border border-slate-700 
                       rounded-3xl shadow-xl overflow-hidden
                       transition-all duration-300 ease-in
                       focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/50"
        >
            {/* Ubah ke flex-row agar input dan tombol send bersebelahan.
              items-end memastikan tombol send tetap di bawah saat textarea membesar.
            */}
            <form
                id="typeArea"
                onSubmit={messageOnSend}
                className="flex flex-row grow items-end px-2 py-2 gap-2"
            >
                <textarea
                    className="grow bg-transparent text-slate-100 placeholder-slate-400
                               px-4 py-3 focus:outline-none resize-none
                               min-h-[50px] max-h-[25vh] overflow-y-auto
                               scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent"
                    rows={5}
                    placeholder="Ask Anything ..."
                    value={data.message_content}
                    onChange={(e) => setData("message_content", e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={processing}
                />

                {/* Tombol Send (Opsional tapi sangat direkomendasikan untuk UX) */}
                <button
                    type="submit"
                    disabled={processing || !data.message_content.trim()}
                    className="p-3 mr-1 mb-0.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 
                               text-white transition-colors shrink-0 shadow-md
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Send Message"
                >
                    <svg
                        className="w-5 h-5 transform rotate-90"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
}
