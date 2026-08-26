export default function ErrorNotification({ message, onClose }) {
    const msg = message ?? "Error Message";

    return (
        <div id="chatNotification" className="w-full pointer-events-auto">
            <div className="flex items-start w-full p-4 gap-3 bg-red-600 border border-red-700 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                
                {/* Warning Icon */}
                <div className="flex-shrink-0 pt-0.5">
                    <svg
                        className="w-6 h-6 text-white"
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4.544"
                    >
                        <g strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="32" cy="32" r="24"></circle>
                            <line x1="32" y1="16" x2="32" y2="36"></line>
                            <line x1="32" y1="44" x2="32" y2="48"></line>
                        </g>
                    </svg>
                </div>

                {/* Message Text */}
                <div className="flex-1 text-sm font-medium text-white break-words leading-relaxed">
                    {msg}
                </div>

                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="flex-shrink-0 inline-flex items-center justify-center p-1 mt-0.5 text-white/70 bg-transparent rounded-lg hover:text-white hover:bg-white/20 transition-colors duration-200 focus:outline-none"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
            </div>
        </div>
    );
}