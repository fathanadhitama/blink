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
        <div className="bg-[#303076]/[.3] p-5 rounded-lg mt-3 min-w-4/5 text-wrap">
            <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-fuchsia-300"><code>b.link</code>/{shortUrl}</h3>
                <button className="p-1 text-sm bg-red-700 hover:bg-red-500 rounded-md"
                onClick={handleDelete}>
                    Delete
                </button>
            </div>
            <p>{longUrl}</p>
            <p>Clicks count: {clicks}</p>
        </div>
    )
}

export default LinkCard;