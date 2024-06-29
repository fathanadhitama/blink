import { Trash2 } from "lucide-react";
import { UrlType } from "../../types/url";

function LinkCard(props: UrlType & { deleteUrl: (id: string) => void }){
    const {
        id,
        longUrl,
        shortUrl,
        clicks, 
        authorId,
        deleteUrl
    } = props

    const handleDelete = async () => {
        deleteUrl(id);
    };

    return (
        <div className="bg-white/[.3] p-5 rounded-lg mt-3 mb-2 break-words shadow-sm shadow-gray-500">
            <div className="flex justify-between gap-3 items-center mb-3">
                <a 
                href={longUrl} target="_blank" className="text-md truncate overflow-hidden w-4/5 md:text-lg font-semibold text-wrap text-gray-800 ">
                    blink-peach.vercel.app/{shortUrl}
                </a>
                <button className="p-1 text-sm bg-red-700 hover:bg-red-500 rounded-md"
                onClick={handleDelete}>
                    <Trash2 size={16}/>
                </button>
            </div>
            <a className="text-sm text-gray-500 font-semibold">🔗 {longUrl}</a>
            <p className="text-sm text-gray-500 font-semibold">🌐 Clicks: {clicks}</p>
        </div>
    )
}

export default LinkCard;