import { useEffect, useState } from "react";
import TagBubble from "./TagBubble";
import TagCreate from "./TagCreate";

export default function TagList({ availableTags, onCancel }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const handleOpenTagEditor = (tag = null) => {
        setSelectedTag(tag);
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => document.body.classList.remove("overflow-hidden");
    }, [isModalOpen]);

    const handleExitTagCreator = () => {
        setIsModalOpen(false);
        setSelectedTag(null);
    };

    return (
        <>
            <div className="flex bg-white flex grow flex-col rounded-lg p-6 m-4">
                <div
                    className={`relative transition-all duration-300 
                            ${isModalOpen && "opacity-50 pointer-events-none"}`}
                >
                    <div className="flex justify-center p-5">
                        <h1 className="font-extrabold font-stretch-ultra-expanded">
                            TAG LIST
                        </h1>
                    </div>

                    <div className="flex flex-wrap grow w-full gap-4">
                        {availableTags?.length > 0 ? (
                            <>
                                {availableTags.map((tag) => (
                                    <TagBubble
                                        key={tag.id}
                                        tag={tag}
                                        onToggle={() =>
                                            handleOpenTagEditor(tag)
                                        }
                                    />
                                ))}

                                <button
                                    className="flex items-center justify-center rounded-md text-white w-14
                                        hover:cursor-pointer p-2 transition-all duration:300 hover:scale-125 
                                        bg-blue-600 hover:bg-blue-500"
                                    type="button"
                                    onClick={() => handleOpenTagEditor(null)}
                                >
                                    <h1 className="font-bold">+</h1>
                                </button>
                            </>
                        ) : (
                            <h1>TAG LIST IS EMPTY</h1>
                        )}
                    </div>
                    <div className="flex justify-center items-center gap-5">
                        <button
                            type="button"
                            onClick={() => onCancel()}
                            className="flex items-center justify-center w-30 h-8 p-1
                                    bg-red-500 hover:bg-red-600 hover:cursor-pointer
                                    transition-all duration-300
                                    rounded-md mt-20
                                    text-white"
                        >
                            Go Back
                        </button>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="flex items-center justify-center inset-0 fixed z-50 bg-black/50">
                        <TagCreate
                            tagData={selectedTag}
                            onExit={handleExitTagCreator}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
