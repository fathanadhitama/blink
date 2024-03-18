export default function LinkCardSkeleton(){
    return (
        <div className="bg-[#303076]/[.3] p-5 rounded-lg mt-3 animate-pulse">
            <div className="bg-indigo-900 rounded w-1/2 h-[20px] mb-5"></div>
            <div className="bg-indigo-900 rounded w-full h-[15px] mb-2"></div>
            <div className="bg-indigo-900 rounded w-full h-[15px]"></div>
        </div>
    )
}