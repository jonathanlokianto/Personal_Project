import MainLayout from "../../Layouts/MainLayout";
import BotChatBubble from "./Partials/BotChatBubble";
import TypeBubble from "./Partials/TypeBubble";
import UserChatBubble from "./Partials/UserChatBubble";

export default function Index() {
    return (
        <div
            id="chatBoundary"
            className="bg-gray-800 flex flex-col grow w-full h-fit
                    py-4 px-30 mx-15
                    rounded-2xl shadow-xl
                    relative overflow-hidden
                    max-h-[95vh]
                    min-h-[95vh]
                    "
        >
            <div
                id="chatArea"
                className="
                    flex flex-col grow overflow-y-auto gap-4 mb-4 scroll-smooth
                "
            >
                <UserChatBubble />
                <BotChatBubble/>
                <UserChatBubble />
            </div>

            <div className="flex-none mb-6">
                <TypeBubble />
            </div>
        </div>
    );
}
Index.layout = (page) => <MainLayout children={page} />;
