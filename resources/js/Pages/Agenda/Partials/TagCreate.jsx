import { router, useForm } from "@inertiajs/react";
import TagBubble from "./TagBubble";

export default function TagCreate({ tagData = null, onExit }) {
    const isEdit = !!tagData;

    const initialData = {
        tag_name: tagData?.tag_name || "",
    };

    const { data, setData, put, post, processing, errors } =
        useForm(initialData);

    const onDeleteTag = () => {
        router.delete(route("tag.destroy", tagData.id), {
            onSuccess: () => {
                onExit();
            },
        });
    };

    console.log(tagData);

    const handleSubmit = (e) => {
        e.preventDefault();
        !isEdit
            ? post(route("tag.store"), {
                  preserveScroll: true,
                  onSuccess: () => {
                      onExit();
                  },
              })
            : put(route("tag.update", tagData.id), {
                  onSuccess: () => {
                      onExit();
                  },
              });
    };

    return (
        <>
            <div className="bg-white flex grow flex-col rounded-lg max-w-100">
                <div className="flex justify-center p-5">
                    <h1 className="font-extrabold font-stretch-ultra-expanded">
                        {!isEdit ? "CREATE NEW" : "EDIT CURRENT"} TAG
                    </h1>
                </div>

                <form
                    className="mx-8 pb-10 flex flex-col gap-6"
                    onSubmit={handleSubmit}
                >
                    {/*  */}
                    {/* Input TAG Name */}
                    {/*  */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="tag_name"
                            className="font-semibold text-gray-700"
                        >
                            Your Tag <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="tag_name"
                            type="text"
                            value={data.tag_name}
                            onChange={(e) =>
                                setData("tag_name", e.target.value)
                            }
                            className="border border-gray-300 rounded-md p-2 
                                    focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        {errors.tag_name && (
                            <span className="text-red-500 text-sm">
                                {errors.tag_name}
                            </span>
                        )}
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
                            Submit
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center w-16 h-8 p-1
                                    bg-red-500 hover:bg-red-600
                                    transition-all duration-300
                                    rounded-md
                                    text-white"
                            onClick={onExit}
                        >
                            Cancel
                        </button>

                        {isEdit && (
                            <button
                                type="button"
                                className="flex items-center justify-center w-16 h-8 p-1
                                        bg-red-500 hover:bg-red-600
                                        transition-all duration-300
                                        rounded-md
                                        text-white"
                                onClick={onDeleteTag}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
