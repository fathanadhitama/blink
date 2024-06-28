export default function LinkCardSkeleton(){
    return (
        <div className="bg-white/[.3] p-5 rounded-lg mt-3 animate-pulse">
            <div className="bg-slate-400/[.4] rounded w-1/2 h-[20px] mb-5"></div>
            <div className="bg-slate-400/[.4] rounded w-full h-[15px] mb-2"></div>
            <div className="bg-slate-400/[.4] rounded w-full h-[15px]"></div>
        </div>
    )
}