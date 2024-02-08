"use client"

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const generateOrderId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderId = '';
    for (let i = 0; i < 12; i++) {
        orderId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return orderId;
}

export default function CartCard({ cart, user, userId }) {
    const baseUrl = process.env.BASE_URL
    useEffect(() => {
        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
        const clientKey = process.env.NEXT_PUBLIC_CLIENT
        const script = document.createElement("script")
        script.src = snapScript
        script.setAttribute("data-client-key", clientKey)
        script.async = true

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, []);
    const [quantity, setQuantity] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const { data: session, status } = useSession()

    const router = useRouter()

    const handleIncrease = () => {
        setQuantity(prev => prev + 1)
    }

    const handleDecrease = () => {
        setQuantity(prev => prev - 1)
    }

    const handleRemove = () => {
        setIsLoading(true);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${baseUrl}api/user/cart/remove`, {
                    method: "DELETE",
                    body: JSON.stringify({ id: cart.id })
                }).then(res => {
                    if (res.ok) {
                        router.refresh()
                        Swal.fire({
                            icon: "success",
                            text: "Product successfully removed from cart",
                            timer: 2000,
                            toast: true,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            position: "top-end"
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            text: "Failed to remove product from cart",
                            timer: 2000,
                            toast: true,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            position: "top-end"
                        });
                    }
                }).catch(error => {
                    Swal.fire({
                        icon: "warning",
                        text: error,
                        position: "center"
                    });
                }).finally(() => {
                    setIsLoading(false); // Dipindahkan ke sini agar selalu dijalankan setelah fetch selesai
                });
            } else {
                setIsLoading(false); // Juga diperlukan jika pengguna membatalkan operasi
            }
        });
    };


    const handleCheckout = async () => {
        if (!user.address) {
            Swal.fire({
                icon: "error",
                text: "Please add your address"
            })
            return
        }
        const data = {
            id: generateOrderId(),
            productName: cart.name,
            quantity: quantity,
            price: cart.price,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            city: user.address.city,
            address: user.address.street,
            zipCode: user.address.zipCode,
            userId: userId,
            productId: cart.productId
        }
        const res = await fetch(`${baseUrl}api/tokenizer`, {
            method: "POST",
            body: JSON.stringify(data)
        })

        const reqData = await res.json()
        window.snap.pay(reqData.token)
    }
    return (
        <div className="w-100 md:w-8/12 flex justify-between p-4 bg-gray-900 rounded-lg border border-gray-600">
            <div className="flex">
                <Image width={100} height={100} src={cart.image} alt={cart.name} className="2-24 h-24 rounded-md mr-4" />
                <div className="flex flex-col justify-between max-w-lg truncate mx-4">
                    <p className="text-gray-600 font-semibold">{cart.name}</p>
                    <p className='text-sm text-gray-100'>{cart.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                    <div className="flex">
                        <button disabled={quantity <= 1} onClick={handleDecrease} className="inline-flex items-center text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <MinusIcon className="w-4 h-4" />
                        </button>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="block w-16 p-2 text-gray-900 border border-gray-300 bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <button onClick={handleIncrease} className="inline-flex items-center text-sm text-gray-900 bg-gray-200 border border-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <PlusIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-around">
                <button className="px-2 py-1 text-sm text-white bg-blue-500 rounded-md" onClick={handleCheckout} disabled={isLoading}>Checkout</button>
                <button className="px-2 py-1 text-sm text-white bg-red-500 rounded-md" onClick={handleRemove} disabled={isLoading}>Remove</button>
            </div>
        </div>
    )
}