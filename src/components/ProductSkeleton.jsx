export default function ProductSkeleton() {
    return (
        <div className="w-11/12 md:max-w-xs mx-auto px-5 group animate-pulse rounded-lg">
            <div className="w-full h-80 bg-gray-400 rounded-md mb-3"></div>
            <div className="px-3">
                <div className="flex justify-between gap-2">
                    <div className="w-8/12 h-4 bg-gray-400 rounded-full mb-2"></div>
                    <div className="w-auto h-4 bg-gray-400 rounded-full mb-2"></div>
                </div>

                <div className="w-full h-8 bg-gray-400 rounded-full mb-2"></div>
                <div className="w-40 h-6 bg-gray-400 rounded-full mb-2"></div>
            </div>

        </div>
    )
}