import DashboardProductsTable from "@/components/DashboardProductsTable"
import { getData } from "@/lib/fetch/service"
import Link from "next/link"

export default async function DashboardProductPage() {
    const baseUrl = process.env.BASE_URL
    const products = await getData(`${baseUrl}api/products`)

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold text-indigo-400">Manage Product</h1>

            <div className="flex flex-col lg:flex-row gap-8 my-3">
                <Link href="/dashboard/product/add" className="text-lg px-3 py-2 w-fit bg-sky-600 hover:bg-sky-800 text-white rounded-md">Add new product</Link>
                <div className="flex items-center text-gray-700">
                    <p>filter by catgeory: </p>
                    <select name="category" id="category" className="text-gray-700 rounded-md px-2 py-1">
                        <option value="all">All</option>
                        <option value="all">Top</option>
                        <option value="all">Bottom</option>

                    </select>
                </div>
                <div className="flex items-center">
                    <p>filter by gender: </p>
                    <select name="category" id="category" className="text-gray-700 rounded-md px-2 py-1">
                        <option value="all">All</option>
                        <option value="all">Male</option>
                        <option value="all">Female</option>
                        <option value="all">Kid</option>
                    </select>
                </div>
            </div>

            <DashboardProductsTable products={products?.data} />
        </div>
    )
}