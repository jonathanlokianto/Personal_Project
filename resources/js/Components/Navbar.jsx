import { Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";

// const getLinkClass = (path) => {
//     const isActive = url === path;
//     return `rounded-md px-3 py-2 text-sm font-medium ${
//         isActive
//             ? "bg-blue-900 text-white"
//             : "text-gray-300 hover:bg-white/5 hover:text-white"
//     }`;
// };

const NavLink = ({ href, children, active }) => {
    return (
        <Link
            href={href}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
                active
                    ? "bg-blue-900 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
            }`}
        >
            {children}
        </Link>
    );
};

export default function Navbar() {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="relative bg-blue-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    {/* 1. Baris Utama (Flex Container) */}
                    <div className="relative flex h-16 items-center justify-between">
                        {/* Bagian Kiri: Logo & Menu */}
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <img
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                    alt="Your Company"
                                    className="h-8 w-auto"
                                />
                            </div>

                            {/* Menu Desktop */}
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <NavLink
                                        href={route("agenda.index")}
                                        active={url === "/agenda"}
                                    >
                                        Agenda
                                    </NavLink>
                                    <NavLink
                                        href="/Chatbot"
                                        active={url === "/chatbot"}
                                    >
                                        Chatbot
                                    </NavLink>
                                    <NavLink
                                        href="/Calendar"
                                        active={url === "/calendar"}
                                    >
                                        Calendar
                                    </NavLink>
                                    <NavLink
                                        href="/Idle"
                                        active={url === "/idle"}
                                    >
                                        Idle
                                    </NavLink>

                                    <NavLink href="/test-flash">TEST</NavLink>
                                </div>
                            </div>
                        </div>{" "}
                        {/* <-- Penutup Bagian Kiri */}
                        {/* Bagian Kanan: Notifikasi & Profil */}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* Tombol Notifikasi */}
                            <button
                                type="button"
                                className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                            >
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">
                                    View notifications
                                </span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="size-6"
                                >
                                    <path
                                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {/* Profile Dropdown */}
                            <div className="relative ml-3">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                        className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                                    />
                                </button>
                                {/* Menu Dropdown (Element Plus) */}
                                {isOpen && (
                                    <div
                                        className="
                                        absolute
                                        right-0
                                        z-50
                                        mt-2
                                        w-48
                                        origin-top-right
                                        rounded-md
                                        bg-white
                                        py-1
                                        shadow-lg
                                        ring-1
                                        ring-black
                                        ring-opacity-5
                                        focus:outline-none
                                        "
                                    >
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700"
                                        >
                                            Your profile
                                        </Link>
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700"
                                        >
                                            Settings
                                        </Link>
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700"
                                        >
                                            Sign out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
