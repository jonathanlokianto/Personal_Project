import headerLogo from "../../assets/images/logo.png";

export default function () {
    return (
        <>
            <header className="w-full bg-blue-600 h-20 shadow-md flex items-center justify-center text-white">
                <h1 className="text-3xl font-bold tracking-tight">
                    MY PERSONAL PROJECT
                </h1>
                <div className="flex shrink-0 items-center">
                    <img
                        src={headerLogo}
                        alt="Your Company"
                        className="h-8 w-auto"
                    />
                </div>
            </header>
        </>
    );
}
