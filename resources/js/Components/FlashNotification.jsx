import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function () {
    const { flash } = usePage().props;
    const [flashNotification, setFlashNotification] = useState([]);
    const timeout = 5000;

    useEffect(() => {
        if (flash.message) {
            const id = Date.now();

            setFlashNotification((prev) => [
                ...prev,
                { id: id, type: flash.type, message: flash.message },
            ]);

            const timer = setTimeout(() => {
                removeFlashNotification(id);
            }, timeout);
        }
    }, [flash.message]);

    const removeFlashNotification = (flashidToRemove) => {
        setFlashNotification((prev) =>
            prev.filter((notif) => notif.id != flashidToRemove),
        );
    };

    if (flashNotification.length === 0) {
        return null;
    }
    // return !flashNotification && null;

    console.log("message sent!");
    return (
        <div className="flex fixed flex-col top-4 right-4 z-50 items-end gap-2 pointer-events-auto cursor-default">
            {flashNotification.map((notif) => (
                <div
                    key={notif.id}
                    className={`
                        text-white rounded-md shadow-lg transition-all flex grow items-center justify-between duration-500
                        ease-in-out hover:translate-y-1
                        p-2
                        ${notif.type === "negative" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
                    `}
                    onClick={() => removeFlashNotification(notif.id)}
                >
                    <span className="font-medium">{notif.message}</span>
                </div>
            ))}
        </div>
    );
}
