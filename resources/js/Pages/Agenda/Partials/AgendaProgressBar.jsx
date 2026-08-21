export default function AgendaProgressBar({
    currentProgress,
    onProgressChange,
}) {
    const steps = [0, 25, 50, 75, 100];

    return (
        <div className="flex gap-1.5 h-2.5 w-full items-center">
            {steps.map((step) => (
                <button
                    key={step}
                    type="button"
                    onClick={() => onProgressChange(step)}
                    className={`transition-all duration-300 flex grow h-full rounded-full cursor-pointer hover:-translate-y-0.5 ${
                        currentProgress >= step
                            ? "bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.4)] hover:bg-blue-400"
                            : "bg-slate-400/40 hover:bg-slate-400/60"
                    }`}
                    title={`Set Progress to ${step}`}
                />
            ))}
        </div>
    );
}