export default function ChatBubbleBase({ chatData }) {
    const chatRole = chatData.role || "assistant";

    return (
        <div
            className={` 
                    flex wrap-break-words
                ${
                    chatRole !== "system"
                        ? `rounded-2xl px-5 py-2.5 mx-6 w-fit max-w-[85%] text-white shadow-md
                    ${
                        chatRole === "user"
                            ? "self-end bg-green-600 rounded-tr-none"
                            : "self-start bg-gray-600 rounded-tl-none"
                    }`
                        : "text-gray-400 text-sm flex-col items-center justify-center my-6 mx-auto w-full text-center"
                }
                `}
        >
            <div className="flex flex-col min-w-20">
                <div className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                    {chatData.message_content}
                </div>
                <div className="flex justify-end mt-1.5 -mb-1 -mr-1">
                    {chatRole !== "system" && (
                        <span className="text-[11px] font-medium opacity-70">
                            {new Date(chatData.created_at).toLocaleString(
                                "id-ID",
                                {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                },
                            )}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
