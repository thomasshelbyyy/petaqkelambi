import { addToCart } from "@/lib/firebase/service"
import { NextResponse } from "next/server"

export async function POST(request) {
    const { productId, userId, name, image, price } = await request.json()
    const res = await addToCart(productId, userId, name, image, price)

    return NextResponse.json({ status: res.status, statusCode: res.statusCode, message: res.message })
}