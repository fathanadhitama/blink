import { useRouter } from "next/navigation";
import { UrlType } from "../../types/url";

function LinkCard(props: UrlType){
    const router = useRouter()
    const {
        id,
        longUrl,
        shortUrl,
        clicks, 
        authorId
    } = props
    
    const deleteUrl = async () => {
        const res: Response = await fetch(
          `/api/delete/${id}`,
          {
            method: 'DELETE'
          }
        );
        router.refresh()
      };

    return (
        <div className="bg-[#303076]/[.3] p-5 rounded-lg mt-3">
            <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-fuchsia-300"><code>b.link</code>/{shortUrl}</h3>
                <button className="p-1 text-sm bg-red-700 hover:bg-red-500 rounded-md"
                onClick={deleteUrl}>
                    Delete
                </button>
            </div>
            <p>{longUrl}</p>
        </div>
    )
}

export default LinkCard;