import { deleteProduct } from "@/lib/firebase/service"
import { NextResponse } from "next/server"

export async function DELETE(request) {
    const req = await request.json()
    await deleteProduct(req.id)
    return NextResponse.json({ status: true, statusCode: 200 })
}