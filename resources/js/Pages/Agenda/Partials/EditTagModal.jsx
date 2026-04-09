import { useForm } from "@inertiajs/react";

export default function CreateTagModal({ tagData = null }) {
    const isEdit = !!tagData;

    const initialData = {
        tag_name: tagData?.tag_name || "",
    };

    const {data, setData, processing, errors} = useForm(initialData);

    return (
        <div className="bg-[#455a73] ">
            <div className="flex justify-center p-5">
                <h1 className="font-extrabold font-stretch-ultra-expanded">
                    {isEdit ? "CREATE NEW " : "EDIT "}Tag
                </h1>
            </div>
            <div>
                <label>
                    Tag Name
                    <span></span>
                </label>
                <input 
                    className="" 
                    type="text"
                    value={data.tag_name}
                ></input>
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
        </div>
    );
}
