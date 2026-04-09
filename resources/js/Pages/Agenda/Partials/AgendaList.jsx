import AgendaBubble from "./AgendaBubble";
import AgendaPagination from "../../../Components/Pagination";

export default function AgendaList({ agendas, onEditClick}) {
    const maxPerPage = 3;
    return (
        <>
            <div className="bg-white flex grow flex-col rounded-lg">
                <div className="flex justify-center p-5">
                    <h1 className="font-extrabold font-stretch-ultra-expanded">
                        AGENDA LIST
                    </h1>
                </div>

                <div className="mx-8 pb-10">
                    {agendas.data && agendas.data.length > 0 ? (
                        <>
                            {agendas.data.map((item) => (
                                <AgendaBubble key={item.id} agenda={item} onEditClick = {onEditClick} />
                            ))}
                        </>
                    ) : (
                        <h1>AGENDA IS EMPTY</h1>
                    )}
                </div>
            </div>
            {agendas.links.length > 3 && (
                <AgendaPagination links={agendas.links} />
            )}
        </>
    );
}
