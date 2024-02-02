"use client"

import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"
import { StarIcon } from "@heroicons/react/24/solid"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import Swal from "sweetalert2"

const ProductCard = ({ product, id, reviews }) => {

    const thisProductReviews = reviews.filter(review => review.product_id === id)

    const sumRating = thisProductReviews.reduce((sum, rating) => sum + rating.rating, 0)

    const { data: session, status } = useSession()

    const handleAddtoCart = async () => {
        if (status === "unauthenticated") {
            Swal.fire({
                icon: "error",
                text: "Please login to add this product to cart",
                timer: 1500,
                toast: true,
                timerProgressBar: true,
                showConfirmButton: false
            })
        } else {
            try {
                const userId = session?.user?.id || ""
                const res = await fetch("http://localhost:3000/api/user/cart/add", {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userId,
                        productId: product.id,
                        name: product.name,
                        image: product.image,
                        price: product.price
                    })
                })

                const result = await res.json()

                if (result.status) {
                    Swal.fire({
                        icon: "success",
                        text: "Product succesfully added to cart",
                        timer: 1500,
                        toast: true,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        position: "top-end"
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "Failed to add product to cart",
                        timer: 1500,
                        toast: true,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        position: "top-end",
                        backdrop: false
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div className=" w-11/12 md:max-w-xs mx-auto px-5 group">
            <div className=" cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">

                <Image height={100} width={100} alt={product.name} src={product.image} className="w-full rounded-lg object-cover object-center" />
                <div className="flex justify-between px-4 my-4 ">
                    <Link href={`/product/detail/${product.id}`} className="font-bold text-gray-500 truncate">{product.name}</Link>
                    <div className="flex">
                        <button className="p-2  mr-2 text-lg text-white rounded-full bg-red-500 hover:bg-red-700 transition duration-200">
                            <HeartIcon className="w- h-4" />
                        </button>
                        <button type="button" className="p-2  text-white rounded-full bg-blue-600 hover:bg-blue-800 transition duration-200" onClick={handleAddtoCart}>
                            <ShoppingCartIcon className="w- h-4" />
                        </button>
                    </div>
                </div>
                <div className="mb-4 ml-4 flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                        <StarIcon key={star} className={`w-28 ${star <= sumRating ? "text-yellow-300" : ""}`} />
                    ))}
                </div>


                <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">{product.price.toLocaleString("id-ID", { style: 'currency', currency: 'IDR' })}</p>
            </div>
        </div>
    )
}

export default ProductCard