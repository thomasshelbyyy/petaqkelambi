"use client"

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DashboardProductsTable({ products }) {

    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async (id) => {
        setIsLoading(true)
        try {
            await fetch(`http://localhost:3000/api/products/delete`, {
                method: "DELETE",
                body: JSON.stringify({ id })
            })
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Gender
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, i) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={product.id}>
                            <td className="px-6 py-4">
                                {i + 1}
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.name}
                            </th>
                            <td className="px-6 py-4">
                                <Image src={product.image} width={100} height={100} alt={product.name} className="" />
                            </td>
                            <td className="px-6 py-4">
                                {product.gender ? product.gender : "Male"}
                            </td>
                            <td className="px-6 py-4">
                                {product.category ? product.category : "Shoes"}
                            </td>
                            <td className="px-6 py-4">
                                {product.price.toLocaleString("id-ID", { style: 'currency', currency: 'IDR' })}
                            </td>
                            <td className="px-6 py-4 flex items-center">
                                <Link href={`/dashboard/product/${product.id}/edit`} className="bg-green-500 hover:bg-green-700 text-white p-1 mr-2 rounded-md">
                                    <PencilSquareIcon className="w-5 h-5" />
                                </Link>
                                <button type="button" disabled={isLoading} className="bg-red-500 hover:bg-red-700 text-white p-1 rounded-md" onClick={() => handleDelete(product.id)}>
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}