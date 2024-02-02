import { getReviewsById, retrieveData } from "@/lib/firebase/service"
import { NextResponse } from "next/server"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("product_id")

    if (productId) {
        const res = await getReviewsById(productId)
        return NextResponse.json({ status: res.status, data: res.data, message: res.message })
    } else {
        const data = await retrieveData('reviews')
        return NextResponse.json({ status: 200, data })
    }

}