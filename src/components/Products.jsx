import ProductCard from "./ProductCard";
import { getData } from "@/lib/fetch/service";
import PaginationComponent from "@/app/(root)/product/[...slug]/Pagination";

export default async function ProductsComponent({ params }) {
    const baseUrl = process.env.BASE_URL
    const getProducts = await getData(`${baseUrl}/api/products`);
    const reviews = await getData(`${baseUrl}/api/review`)

    const products = getProducts.data

    const category = params.slug[1] || "top"

    const productsByCategory = products.filter(product => product.gender.toLowerCase() === params.slug[0] && product.category.toLowerCase() === category)

    const currentPage = params.slug[2] || "1"
    const itemPerPage = 10
    const indexOfLastItem = currentPage * itemPerPage
    const indexOfFirstItem = indexOfLastItem - itemPerPage
    const currentItems = productsByCategory.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(productsByCategory.length / itemPerPage)


    return (
        <div className="w-11/12 md:w-3/4 min-h-screen bg-white p-4 rounded ml-4">
            <h2 className="text-lg font-bold mb-4">Daftar Produk</h2>
            <div className="flex flex-wrap gap-4 min-h-40">
                {/* CARD */}
                {currentItems.length > 0 ? currentItems.map(product => (
                    <ProductCard key={product.id} product={product} id={product.id} reviews={reviews.data} />
                )) : (
                    <p>product not found</p>
                )}
            </div>

            {/* PAGINATION */}
            <PaginationComponent
                params={params}
                currentPage={currentPage}
                totalPages={totalPages}
                products={productsByCategory}
                indexOfLastItem={indexOfLastItem}
                indexOfFirstItem={indexOfFirstItem}
            />
        </div>
    )
}