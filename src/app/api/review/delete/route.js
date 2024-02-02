import { deleteReview } from "@/lib/firebase/service"
import { NextResponse } from "next/server"

export async function DELETE(request) {
    const { reviewId } = await request.json()

    const res = await deleteReview(reviewId)
    return NextResponse.json({ status: res.status, message: res.message })
}