import { updateReview } from "@/lib/firebase/service"
import { NextResponse } from "next/server"

export async function PUT(request) {
    const { reviewId, rating, review } = await request.json()

    const res = await updateReview(reviewId, rating, review)
    return NextResponse.json({ status: res.status, statusCode: res.statusCode, message: res.message })
}