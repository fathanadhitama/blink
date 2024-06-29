import { Trash2 } from "lucide-react";
import { UrlType } from "../../types/url";
import { toast } from "./Toast";

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

    const copyUrlToClipboard = () => {
        navigator.clipboard.writeText(`blink-peach.vercel.app/${shortUrl}`)
        toast.success('Link copied to clipboard!')
    }
    return (
        <div className="bg-white/[.3] p-5 rounded-lg mt-3 mb-2 break-words shadow-sm shadow-gray-500">
            <div className="flex justify-between gap-3 items-center mb-3">
                <div onClick={copyUrlToClipboard} className="text-md hover:cursor-pointer truncate overflow-hidden w-4/5 md:text-lg font-bold text-wrap text-gray-800 ">
                    blink-peach.vercel.app/{shortUrl}
                </div>
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