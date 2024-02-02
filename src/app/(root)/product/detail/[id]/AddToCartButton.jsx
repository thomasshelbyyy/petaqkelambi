"use client"

import { ShoppingCartIcon } from "@heroicons/react/24/solid"
import { useSession } from "next-auth/react"

export default function AddToCartButton({ productId, productName, image, price }) {
    const { data: session, status } = useSession()
    const handleAddtoCart = async () => {
        if (status === "unauthenticated") {
            alert("please login before add this to your wishlist")
        } else {
            try {
                const userId = session?.user?.id || ""
                const res = await fetch("http://localhost:3000/api/user/cart/add", {
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
                    alert("Product added to cart")
                } else {
                    alert(response.message)
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