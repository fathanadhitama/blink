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
        <div className="bg-[#303076]/[.3] p-5 rounded-lg mt-3 break-words">
                <p className="text-sm md:text-md font-semibold text-wrap text-fuchsia-300">blink-peach.vercel.app/{shortUrl}</p>
                <button className="p-1 text-sm bg-red-700 hover:bg-red-500 rounded-md"
                onClick={handleDelete}>
                    Delete
                </button>
            <p className="p-1 text-sm">{longUrl}</p>
            <p className="p-1 text-sm">Clicks count: {clicks}</p>
        </div>
    )
}

export default LinkCard;