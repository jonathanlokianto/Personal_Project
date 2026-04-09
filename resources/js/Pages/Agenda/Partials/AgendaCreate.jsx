import { useForm } from "@inertiajs/react";
import AgendaProgressBar from "./AgendaProgressBar";
import TagBubble from "./TagBubble";

export default function AgendaCreate({
    availableTags,
    onCancel,
    agendaData = null,
}) {
    const isEdit = !!agendaData;

    const initialData = {
        content: agendaData?.content || "",
        note: agendaData?.note || "",
        progress: agendaData?.progress || 0,
        isSuspended: agendaData?.isSuspended || false,
        tags: agendaData?.tags ? agendaData.tags.map((tag) => tag.id) : [],
    };

    const { data, setData, post, put, processing, errors } =
        useForm(initialData);

    const handleToggleTag = (tagId) => {
        if (data.tags.includes(tagId)) {
            setData(
                "tags",
                data.tags.filter((id) => id !== tagId),
            );
        } else {
            setData("tags", [...data.tags, tagId]);
        }
    };

    const handleProgressClick = (step) => {
        setData("progress", step);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        isEdit === false
            ? post(route("agenda.store"), {
                  preserveScroll: true,
                  onSuccess: () => {
                      onCancel();
                  },
              })
            : put(route("agenda.update", agendaData.id), {
                  preserveScroll: true,
                  onSuccess: () => {
                      onCancel();
                  },
              });

        {
        }
    };

    return (
        <>
            <div className="bg-white flex grow flex-col rounded-lg">
                <div className="flex justify-center p-5">
                    <h1 className="font-extrabold font-stretch-ultra-expanded">
                        {isEdit ? "CREATE NEW " : "EDIT "}AGENDA
                    </h1>
                </div>

                <form
                    className="mx-8 pb-10 flex flex-col gap-6"
                    onSubmit={handleSubmit}
                >
                    {/*  */}
                    {/* Input Agenda Content */}
                    {/*  */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="content"
                            className="font-semibold text-gray-700"
                        >
                            Your Agenda <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="content"
                            type="text"
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            className="border border-gray-300 rounded-md p-2 
                                    focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="What do you plan to do?"
                            required
                        />
                        {errors.content && (
                            <span className="text-red-500 text-sm">
                                {errors.content}
                            </span>
                        )}
                    </div>
                    {/*  */}
                    {/* Input Note */}
                    {/*  */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="note"
                            className="font-semibold text-gray-700"
                        >
                            Additional Note
                            <span className="ml-2 text-gray-400 font-normal">
                                *Optional
                            </span>
                        </label>
                        <textarea
                            id="note"
                            type="text"
                            rows={3}
                            value={data.note}
                            onChange={(e) => setData("note", e.target.value)}
                            className="border border-gray-300 rounded-md p-2 
                                    focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="What do you plan to do?"
                        />
                        {errors.content && (
                            <span className="text-red-500 text-sm">
                                {errors.note}
                            </span>
                        )}
                    </div>
                    {/*  */}
                    {/* Current Progress */}
                    {/*  */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="progress"
                            className="font-semibold text-gray-700"
                        >
                            Current Progress
                            <span className="ml-2 text-gray-400 font-normal">
                                {data.progress}%
                            </span>
                        </label>

                        <AgendaProgressBar
                            currentProgress={data.progress}
                            onProgressChange={handleProgressClick}
                        />

                        {errors.progress && (
                            <span className="text-red-500 text-sm">
                                {errors.progress}
                            </span>
                        )}
                    </div>

                    {/*  */}
                    {/* Is Suspended? */}
                    {/*  */}
                    <div className="flex gap-2">
                        <label
                            htmlFor="isSuspended"
                            className="font-semibold text-gray-700"
                        >
                            Status:
                            <span
                                className={`ml-2 items-end inline-block w-24 ${
                                    data.isSuspended
                                        ? "text-red-500"
                                        : "text-green-500"
                                }`}
                            >
                                {data.isSuspended ? "Suspended" : "Active"}
                            </span>
                        </label>
                        <input
                            className="items-end sr-only peer"
                            id="isSuspended"
                            type="checkbox"
                            checked={data.isSuspended}
                            onChange={(e) => {
                                setData("isSuspended", e.target.checked);
                            }}
                        />
                        {errors.isSuspended && (
                            <span className="text-red-500 text-sm">
                                {errors.isSuspended}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>
                            Add Tags
                            <span className="text-gray-400 ml-2">
                                *Optional
                            </span>
                        </label>

                        <div className="flex flex-wrap grow w-full gap-4 p-2">
                            {availableTags?.length > 0 ? (
                                availableTags.map((tag) => (
                                    <TagBubble
                                        key={tag.id}
                                        tag={tag}
                                        isSelected={data.tags.includes(tag.id)}
                                        onToggle={() => handleToggleTag(tag.id)}
                                    />
                                ))
                            ) : (
                                <p>No Tags Available</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-5">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center justify-center w-16 h-8 p-1
                                    bg-green-500 hover:bg-green-600
                                    transition-all duration-300
                                    rounded-md
                                    text-white"
                        >
                            {isEdit ? "Update" : "Submit"}
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center w-16 h-8 p-1
                                    bg-red-500 hover:bg-red-600
                                    transition-all duration-300
                                    rounded-md
                                    text-white"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
