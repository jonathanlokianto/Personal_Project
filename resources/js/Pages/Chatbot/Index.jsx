import { useEffect, useRef, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import ChatBubbleBase from "./Partials/ChatBubbleBase";
import TypeBubble from "./Partials/TypeBubble";
import { router } from "@inertiajs/react";

export default function Index({ chatHistory }) {
    const [isAtBottomChat, setIsAtBottomChat] = useState(true);
    const latestMessageRef = useRef(null);
    const chatAreaRef = useRef(null);
    const scrollToBottom = () => {
        chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const magnetScroll = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    chatAreaRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }
            },
            { threshold: 0.3 },
        );
        if(chatAreaRef.current){
            magnetScroll.observe(chatAreaRef.current);
        }

        return() => {
            if(chatAreaRef.current){
                magnetScroll.unobserve(chatAreaRef.current);
            }
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsAtBottomChat(entry.isIntersecting);
            },
            { threshold: 0.1 },
        );

        if (latestMessageRef.current) {
            observer.observe(latestMessageRef.current);
        }
        return () => {
            if (latestMessageRef.current) {
                observer.unobserve(latestMessageRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isAtBottomChat) {
            const timeOut = setTimeout(() => {
                scrollToBottom();
            }, 50);
            return ()=> clearTimeout(timeOut);
        }
    }, [chatHistory]);

    useEffect(() => {
        if (window.Echo) {
            const chatChannel = window.Echo.channel("chat_channel");
            chatChannel.listen("RealtimeMessage", (e) => {
                router.reload({ only: ["chatHistory"] });
            });
            return () => {
                window.Echo.leaveChannel("chat_channel");
            };
        }
    }, []);

    return (
        <div
            id="chatBoundary"
            className="bg-gray-800 flex flex-col grow w-full h-fit
                    py-4 px-4 md:px-30 mx-4
                    rounded-2xl shadow-xl
                    relative overflow-hidden
                    max-h-[100vh]
                    min-h-[100vh]
                    "
        >
            <div
                ref={chatAreaRef}
                id="chatArea"
                className="
                    flex flex-col grow overflow-y-auto gap-4 p-4 md:p-6
                    scroll-smooth scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent
                "
            >
                {chatHistory.map((chat) => (
                    <ChatBubbleBase key={chat.id} chatData={chat} />
                ))}
                <div ref={latestMessageRef} />
            </div>

            {!isAtBottomChat && (
                <button
                    onClick={scrollToBottom}
                    className="absolute z-50 bottom-56 left-1/2 -translate-x-1/2 bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-full shadow-lg transition-all animate-bounce"
                    title="Got to Bottom"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </button>
            )}

            <div className="flex-none p-4 bg-gray-800 border-t border-gray-700/50">
                <TypeBubble />
            </div>
        </div>
    );
}
Index.layout = (page) => <MainLayout children={page} />;
