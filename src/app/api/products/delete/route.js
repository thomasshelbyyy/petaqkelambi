import { deleteProduct } from "@/lib/firebase/service"
import { NextResponse } from "next/server"

export async function DELETE(request) {
    const req = await request.json()
    await deleteProduct(req.id)
    return NextResponse.redirect("http://localhost:3000/dashboard/product")
}