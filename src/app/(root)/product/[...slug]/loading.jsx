import ProductSkeleton from "@/components/ProductSkeleton"

export default function Loading() {
    const skeletonElement = []

    for (let i = 0; i < 8; i++) {
        skeletonElement.push(<ProductSkeleton key={i} />)
    }
    return (
        <div className="w-11/12 md:w-full min-h-screen bg-white px-4 pt-8 rounded ml-4 animate-pulse">
            <div className="w-32 h-4 bg-gray-400 mb-4"></div>
            <div className="flex flex-wrap gap-4 min-h-40">
                {skeletonElement}
            </div>
        </div>
    )
}