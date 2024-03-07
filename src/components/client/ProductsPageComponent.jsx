"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Error from "@/app/(root)/product/[...slug]/error";

export default function ProductsPageComponent({ children }) {
    const validSlug = ["male", "female", "kids"]

    const history = useRouter()
    const params = useParams()

    useEffect(() => {
        if (!params.slug || !params.slug[1]) {
            history.push(`/product/${params.slug[0]}/top`)
        }
    }, [params, history])

    if (!validSlug.includes(params.slug[0])) {
        return (
            <Error />
        )
    }

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start p-8 bg-gray-100">
            {/* Bagian Kanan: Daftar Produk */}
            {children}
        </div>
    )
}