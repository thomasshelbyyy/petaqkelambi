import { addReview } from "@/lib/firebase/service"
import { NextResponse } from "next/server"

export async function POST(request) {
    const { productId, productName, userId, username, rating, review } = await request.json()
    const res = await addReview(productId, productName, userId, username, rating, review)

    return NextResponse.json({ status: res.status, message: res.message })
}