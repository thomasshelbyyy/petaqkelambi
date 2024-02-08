import { deleteProduct } from "@/lib/firebase/service"
import { NextResponse } from "next/server"

export async function DELETE(request) {
    const baseUrl = process.env.BASE_URL
    const req = await request.json()
    await deleteProduct(req.id)
    return NextResponse.redirect(`${baseUrl}dashboard/product`)
}