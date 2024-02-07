import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import CartCard from "./CartsComponents"
import { getData } from "@/lib/fetch/service"

export const metadata = {
    title: "User Carts | Petaqkelambi"
}

export default async function UserCart() {
    const session = await getServerSession(authOptions)
    const carts = await getData("http://localhost:3000/api/user/cart?id=" + session.user.id)
    const user = await getData("http://localhost:3000/api/user?id=" + session.user.id)

    return (
        <div className="min-h-screen w-full flex justify-center">
            <div className="w-11/12 md:w-8/12 rounded-ld bg-gray-800 text-gray-300 p-6">
                <h1 className="text-xl font-semibold mb-4">Carts</h1>
                {carts.data.length < 1 ? (
                    <p >you don&apos;t have product at your cart</p>
                ) : carts.data.map(cart => (
                    <CartCard cart={cart} key={cart.id} user={user.data} userId={session.user.id} />
                ))}
            </div>
        </div>
    )
}