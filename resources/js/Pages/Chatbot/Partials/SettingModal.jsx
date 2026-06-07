export default function SettingModal({ innerModalAreaRef }) {
    const onClickExit = () => {
        handleExit();
    };

    return (
        <div className="flex items-center justify-center inset-0 fixed z-50 bg-black/50">
            <div
                className="bg-gray-800
                        outline-3 outline-white
                        flex items-center justify-center h-150 w-150
                        rounded-2xl
                    "
                ref={innerModalAreaRef}
            >
                <form
                    className="mx-8 pb-10 flex flex-col gap-6"
                    // onSubmit={handleSubmit}
                >
                </form>
            </div>
        </div>
    );
}
