import MainLayout from "../../Layouts/MainLayout";
import ChatBubbleBase from "./Partials/ChatBubbleBase";
import TypeBubble from "./Partials/TypeBubble";
import TrashIcon from "../../../assets/images/TrashIcon.png";
import GearIcon from "../../../assets/images/GearIcon.png";
import SettingModal from "./Partials/SettingModal";

import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import { useStream } from "@laravel/stream-react";

export default function Index({ chatHistory }) {
    const [isAtBottomChat, setIsAtBottomChat] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(null);

    const latestMessageRef = useRef(null);
    const innerModalAreaRef = useRef(null);

    const chatAreaRef = useRef(null);
    const scrollToBottom = () => {
        chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
        });
    };

    //START STREAMING
    const { data, isFetching, isStreaming, send, jsonData } =
        useStream("/chatbot/stream");
    const sendMessage = () => {
        send({
            content: "",
        });
    };

    // watch([isStreaming, data], () => {
    //     if (isStreaming.value) {
    //         scrollToBottom();
    //     }
    // });

    useEffect(() => {
        const handleOuterSettingModalClick = (e) => {
            if (
                innerModalAreaRef.current &&
                !innerModalAreaRef.current.contains(e.target)
            ) {
                setIsModalOpen(false);
                console.log("CLICKED CLOSE");
            }
        };
        document.addEventListener("mousedown", handleOuterSettingModalClick);
        return () => {
            document.removeEventListener(
                "mousedown",
                handleOuterSettingModalClick,
            );
        };
    }, []);

    useEffect(() => {
        if (isStreaming) {
            scrollToBottom();
        }
    }, [isStreaming]);

    const handleStreamingResponses = (userPrompt) => {
        setTimeout(() => {
            send({
                content: [
                    {
                        type: "prompt",
                        content: userPrompt,
                    },
                ],
            });
        });
    };

    //END STREAMING

    const handleOpenSettingsModal = () => {
        console.log("open");
        setIsModalOpen(true);
    };

    const handleExitSettingsModal = () => {
        console.log("close");
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [isModalOpen]);

    const handleDeleteAllMessages = () => {
        if (
            window.confirm("Do you really want to clear this chat's history?")
        ) {
            router.delete(route("chatbot.clear"));
        }
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
        if (chatAreaRef.current) {
            magnetScroll.observe(chatAreaRef.current);
        }

        return () => {
            if (chatAreaRef.current) {
                magnetScroll.unobserve(chatAreaRef.current);
            }
        };
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
            return () => clearTimeout(timeOut);
        }
    }, [chatHistory]);

    useEffect(() => {
        if (window.Echo) {
            const chatChannel = window.Echo.channel("chatbot_channel");
            chatChannel.listen(".RealtimeMessage", (e) => {
                router.reload({ only: ["chatHistory"] });
            });

            const chatTruncateChannel = window.Echo.channel(
                "truncateChatHistory-channel",
            );
            chatTruncateChannel.listen(".chatHistorytruncated", (e) => {
                router.reload({ only: ["chatHistory"] });
            });
            return () => {
                window.Echo.leaveChannel("chatbot_channel");
                window.Echo.leaveChannel("truncateChatHistory-channel");
            };
        }
    }, []);

    return (
        <div
            id="chatBoundary"
            className="bg-gray-800 flex
                    flex-col grow w-full h-screen
                    py-4 px-4 md:px-30 mx-4
                    rounded-2xl shadow-xl
                    relative overflow-hidden
                    outline-3 outline-white
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
                {chatHistory?.length > 0 ? (
                    chatHistory.map((chat) => (
                        <ChatBubbleBase key={chat.id} chatData={chat} />
                    ))
                ) : (
                    <div
                        className="text-gray-400 text-lg
                                    flex-col items-center justify-center 
                                    my-6 mx-auto 
                                    w-full text-center"
                    >
                        No Messages Yet
                    </div>
                )}
                {(isStreaming || isFetching) && (
                    <div className="flex w-full mt-2 space-x-3 max-w-2xl">
                        <ChatBubbleBase
                            chatData={{
                                role: "assistant",
                                message_content: data || "Writing ...", // Menampilkan data yang masuk, atau kosong jika masih fetching
                            }}
                            isStreaming={true}
                        />
                    </div>
                )}
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

            <div className="flex flex-col bg-gray-800 border-t border-gray-700/50">
                <div className="flex justify-between px-6 pt-3 -mb-1">
                    <button
                        onClick={handleOpenSettingsModal}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium 
                        text-gray-400 bg-gray-700/30 hover:bg-red-500/10 hover:text-red-400 
                        rounded-lg transition-all duration-300 border border-transparent 
                        hover:border-red-500/20 group"
                    >
                        <img
                            src={GearIcon}
                            className="w-4 h-4 group-hover:opacity-100 transition-opacity"
                        />
                    </button>
                    <button
                        onClick={handleDeleteAllMessages}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium 
                        text-gray-400 bg-gray-700/30 hover:bg-red-500/10 hover:text-red-400 
                        rounded-lg transition-all duration-300 border border-transparent 
                        hover:border-red-500/20 group"
                    >
                        <img
                            src={TrashIcon}
                            className="w-4 h-4 group-hover:opacity-100 transition-opacity"
                        />
                    </button>
                </div>

                <div className="flex-none p-4">
                    <TypeBubble onMessageSend={handleStreamingResponses} />
                </div>

                {isModalOpen && (
                <SettingModal innerModalAreaRef = {innerModalAreaRef}/>
                )}
            </div>
        </div>
    );
}
Index.layout = (page) => <MainLayout children={page} />;
