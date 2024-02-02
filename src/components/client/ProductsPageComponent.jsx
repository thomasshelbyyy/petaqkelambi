"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import MobileCategoryComponent from "@/components/MobileCategoryComponens";
import MediumCategory from "@/components/MediumCategory";
import Error from "@/app/(root)/product/[...slug]/error";

export default function ProductsPageComponent({ children }) {
    const categories = ["Top", "Bottom", "Shoes", "Hat", "Accessories"]
    const validSlug = ["male", "female", "kids"]

    const [selected, setSelected] = useState(categories[0])

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

            {/* Bagian Kiri: Daftar Kategori Produk */}
            <MediumCategory
                categories={categories}
                gender={params.slug[0].toLowerCase()}
            />

            {/* KATEGORI TUNTUK TAMPILAN MOBILE */}
            <div className="md:hidden">
                <MobileCategoryComponent
                    selected={selected}
                    setSelected={setSelected}
                    categories={categories}
                />
            </div>

            {/* Bagian Kanan: Daftar Produk */}
            {children}
        </div>
    )
}