import Image from "next/image"
import toys from "@/../public/toys.svg"

function NotFoundPage() {
	return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#141414] lg:px-10">
        <div className="flex flex-col w-full items-center text-center gap-5">
            <Image src={toys} alt="" width={40} height={50} className="w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4"/>
            <h2 className="text-xl font-semibold">
                <span className="text-[#FAD810]">404</span> | Page not found :(
            </h2>
            <a href="/" 
            className="text-yellow-300 border border-yellow-300 
            hover:bg-yellow-300 hover:text-black p-3 rounded-md">Go back</a>
        </div>
    </div>
    )
}

export default NotFoundPage
