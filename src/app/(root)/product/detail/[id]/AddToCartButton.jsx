"use client"

import { ShoppingCartIcon } from "@heroicons/react/24/solid"
import { useSession } from "next-auth/react"
import Swal from "sweetalert2"

export default function AddToCartButton({ productId, productName, image, price }) {
    const baseUrl = process.env.BASE_URL
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
                const res = await fetch(`${baseUrl}/api/user/cart/add`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userId,
                        productId: productId,
                        name: productName,
                        image: image,
                        price: price
                    })
                })

                const response = await res.json()

                if (response.status) {
                    Swal.fire({
                        icon: "success",
                        text: "Product succesfully added to cart",
                        timer: 3000,
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
        <button onClick={handleAddtoCart} className="p-2 rounded-full bg-blue-500">
            <ShoppingCartIcon className="w-6" />
        </button>
    )
}