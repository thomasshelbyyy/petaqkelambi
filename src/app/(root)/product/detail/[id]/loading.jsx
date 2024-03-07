export default function Loading() {
    return (
        <div className="mt-8 w-screen flex flex-col items-center py-4 bg-gray-300 animate-pulse">
            <div className="flex flex-col md:flex-row justify-center w-11/12 p-8 h-[800px] rounded-lg bg-white">
                <div className="md:w-1/2">
                    <div className="rounded-lg w-80 h-96 bg-gray-400 mb-4"></div>
                </div>

                <div className="md:w-1/2">
                    <div className="md:w-1/2 flex flex-col justify-center">
                        <div className="h-5 w-96 rounded-full bg-gray-400 mb-4"></div>
                        <div className="h-8 w-80 rounded-full bg-gray-400 mb-4"></div>
                        <div className="h-3 w-96 rounded-full bg-gray-400 mb-3"></div>
                        <div className="h-3 w-96 rounded-full bg-gray-400 mb-3"></div>
                        <div className="h-3 w-96 rounded-full bg-gray-400 mb-3"></div>
                        <div className="h-3 w-96 rounded-full bg-gray-400 mb-3"></div>
                        <div className="h-3 w-96 rounded-full bg-gray-400 mb-3"></div>
                        <div className="h-3 w-96 rounded-full bg-gray-400 mb-3"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}