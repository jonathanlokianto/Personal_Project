import { Link, progress, router } from "@inertiajs/react";
import AgendaProgressBar from "./AgendaProgressBar";
import lockLogo from "../../../../assets/images/lock.png";
import unlockLogo from "../../../../assets/images/unlock.png";

// const AgendaProgressBar = ({ currentProgress, onProgressChange }) => {
//     const steps = [0, 25, 50, 75, 100];

//     return (
//         <div className="flex gap-1 h-3 w-full">
//             {steps.map((step) => (
//                 <button
//                     key={step}
//                     onClick={() => onProgressChange(step)}
//                     className={`transition-all flex grow rounded duration-300 ${
//                         currentProgress >= step
//                             ? "bg-blue-500 hover:bg-blue-600"
//                             : "bg-gray-500 hover:bg-gray-600"
//                     }`}
//                     title={`Set Progress to ${step}`}
//                 />
//             ))}
//         </div>
//     );
// };

export default function AgendaBubble({ agenda, onEditClick }) {
    // const handleProgressClick = (step) => {
    //     router.put(
    //         `/agenda/${agenda.id}`,
    //         { progress: step },
    //         {
    //             preserveScroll: true,
    //         },
    //     );

    const handleEdit = () => {
        onEditClick(agenda);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this agenda?")) {
            router.delete(route("agenda.destroy", agenda.id), {
                preserveScroll: true,
            });
        }
    };

    const handleProgressClick = (step) => {
        router.put(
            route("agenda.update", agenda),
            { progress: step },
            {
                preserveScroll: true,
                // onStart: () => console.log("Request dimulai..."),
                // onSuccess: () => console.log("Berhasil diupdate!"),
                // onError: (err) => console.log("Error nih:", err),
            },
        );
    };

    return (
        <>
            <div className="w-full p-2">
                <div className="bg-[#455a73] relative flex flex-col p-5 text-white rounded-xl border border-[#3b4d63] transition-all hover:shadow-lg">
                    <div
                        className={`${agenda.isSuspended && "opacity-40 pointer-events-none"}`}
                    >
                        <div className="mb-2">
                            <h1 className="text-xl font-bold tracking-wide text-slate-50">
                                {agenda.content}
                            </h1>
                            <h4 className="text-slate-50">{agenda.note}</h4>
                        </div>

                        {agenda.progress >= 100 ? (
                            <h6 className="text-green-600 font-bold">
                                ✅ Completed at{" "}
                                {new Date(
                                    agenda.completed_at,
                                ).toLocaleDateString()}
                            </h6>
                        ) : (
                            <div className="flex flex-col gap-0.5">
                                <h4 className="leading-none mb-2 font-medium">
                                    Progress: {agenda.progress}%
                                </h4>
                                <AgendaProgressBar
                                    currentProgress={agenda.progress}
                                    onProgressChange={handleProgressClick}
                                />
                            </div>
                        )}

                        <div className="flex justify-between items-center mt-2">
                            <div className="flex flex-wrap gap-2">
                                {agenda.tags?.map((tag) => (
                                    <span key={tag.id}>#{tag.tag_name}</span>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white 
                                                text-sm px-4 py-1.5 rounded-md transition-colors 
                                                shadow-sm cursor-pointer"
                                    onClick={handleEdit}
                                >
                                    Edit
                                </button>

                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white 
                                                text-sm px-4 py-1.5 transition-color 
                                                rounded-md shadow-sm cursor-pointer"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="absolute w-8 h-8 top-6 right-6">
                        {agenda.isSuspended ? (
                            <button
                                onClick={() => {
                                    router.put(
                                        route("agenda.update", agenda.id),
                                        { isSuspended: !agenda.isSuspended },
                                        {
                                            preserveScroll: true,
                                        },
                                    );
                                }}
                            >
                                <img src={lockLogo} />
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    router.put(
                                        route("agenda.update", agenda.id),
                                        { isSuspended: !agenda.isSuspended },
                                        {
                                            preserveScroll: true,
                                        },
                                    );
                                }}
                            >
                                <img src={unlockLogo} />
                            </button>
                        )}
                    </div>

                    {/* <h6>Created At {agenda.created_at}</h6>
                        <h6>Updated At {agenda.updated_at}</h6> */}
                </div>
            </div>
        </>
    );
}
