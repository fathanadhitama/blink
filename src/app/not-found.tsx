function NotFoundPage() {
	return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#060627] lg:px-10">
        <div className="flex flex-col items-center text-center gap-5">
            <h1 className="text-transparent bg-clip-text text-[120px] font-bold bg-gradient-to-tr 
              from-[#4158D0] via-[#C850C0] to-[#FFCC70] border-b-2">404</h1>
            <h2 className="text-xl font-semibold">Page not found :(</h2>
        </div>
    </div>
    )
}

export default NotFoundPage
