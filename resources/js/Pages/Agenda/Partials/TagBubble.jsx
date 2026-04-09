export default function TagBubble({ tag = null, isSelected = null, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className={`flex items-center justify-center rounded-md text-white
                    hover:cursor-pointer p-2 transition-all duration-300 hover:scale-125
                    ${isSelected ? "bg-blue-600 scale-110 hover:bg-blue-500" : "bg-blue-300 hover:bg-blue-500"}
                `}
            type="button"
        >
            #{tag.tag_name}
        </button>
    );
}
