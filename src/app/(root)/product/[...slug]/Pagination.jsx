import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function PaginationComponent({ params, currentPage, totalPages, products, indexOfFirstItem, indexOfLastItem }) {
    const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i)

    const getPaginationLinks = () => {
        const pageToShow = 3
        const pageStart = Math.max(1, currentPage - Math.floor(pageToShow / 2))
        const pageEnd = Math.min(totalPages, pageStart + pageToShow - 1);

        return range(pageStart, pageEnd);
    }

    const paginationLinks = getPaginationLinks()

    const startIndex = indexOfFirstItem + 1
    const endIndex = Math.min(indexOfLastItem, products.length)
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    href={`/product/${params.slug[0]}/${params.slug[1]}/${parseInt(currentPage) - 1}`}
                    className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === 1 ? "hidden" : ""}`}
                >
                    Previous
                </Link>
                <a
                    href={`/product/${params.slug[0]}/${params.slug[1]}/${parseInt(currentPage) - 1}`}
                    className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === totalPages ? "hidden" : ""}`}
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{startIndex}</span> to <span className="font-medium">{endIndex}</span> of
                        <span className="font-medium">{products.length}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Link
                            href={`/product/${params.slug[0]}/${params.slug[1]}/${parseInt(currentPage, 10) - 1}`}
                            className={`relative items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage == "1" ? "hidden" : "inline-flex"}`}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        {paginationLinks.length > 0 && paginationLinks.map(pageNumber => (
                            <Link
                                key={pageNumber}
                                href="#"
                                className={`relative  inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${pageNumber == currentPage ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"}`}
                            >
                                {pageNumber}
                            </Link>
                        ))}
                        <Link
                            href={`/product/${params.slug[0]}/${params.slug[1]}/${parseInt(currentPage, 10) + 1}`}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage == totalPages ? "hidden" : ""}`}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}