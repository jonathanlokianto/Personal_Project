export default function BotChatBubble({message}) {
    return (
        <div
            className=" bg-gray-600 rounded-xl
                    flex wrap-break-word
                    px-6 py-2
                    w-fit max-w-[75%]
                    text-white
                    self-start shadow-sm rounded-tl-none
                "
        >
            <div>{message}</div>
        </div>
    );
}
