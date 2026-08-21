export default function ({message, onClose}) {
    let msg = message ?? "Error Message";

    return (
        <div 
            id="chatNotification" 
            className="w-full pointer-events-auto gap-2"
            >
            <div
                className="bg-red-800 
                            flex
                            rounded-md
                            p-2
                            text-sm font-medium text-white 
                            wrap-break-word w-full leading-relaxed shadow-lg
                            gap-2
                            transition-all
                            ease-in-out 
                            hover:scale-95
                            duration-500
                            "
                onClick={onClose}
            >
                <div
                    className="flex justify-center items-center">
                    <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="#ff0000"
                        strokeWidth="4.544"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <circle cx="32" cy="32" r="24"></circle>
                            <line x1="32" y1="16" x2="32" y2="36"></line>
                            <line x1="32" y1="44" x2="32" y2="48"></line>
                        </g>
                    </svg>
                </div>
                <span>{msg}</span>
            </div>
        </div>
    );
}
