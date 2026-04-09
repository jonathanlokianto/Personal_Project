import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <div className="flex flex-wrap justify-center gap-1 mt-6 mb-4">
            {links.map((link, index) => (
                <Link 
                    key={index}
                    href={link.url || "#"}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-4 py-2 text-sm rounded-md transition-all border ${
                        link.active
                            ? "bg-blue-600 text-white border-blue-600 font-bold"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    } ${
                        !link.url
                            ? "opacity-50 cursor-not-allowed pointer-events-none"
                            : ""
                    }
                    `}
                ></Link>
            ))}
        </div>
    );
}
