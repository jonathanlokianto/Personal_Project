export default function AgendaProgressBar({
    currentProgress,
    onProgressChange,
}) {
    const steps = [0, 25, 50, 75, 100];

    return (
        <div className="flex gap-1 h-3 w-full">
            {steps.map((step) => (
                <button
                    key={step}
                    type="button"
                    onClick={() => onProgressChange(step)}
                    className={`transition-all flex grow rounded duration-300 ${
                        currentProgress >= step
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    title={`Set Progress to ${step}`}
                />
            ))}
        </div>
    );
}
