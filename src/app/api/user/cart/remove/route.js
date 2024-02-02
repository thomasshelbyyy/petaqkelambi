import { removeFromCart } from "@/lib/firebase/service"
import { NextResponse } from "next/server"

export async function DELETE(request) {
    const { id } = await request.json()
    const res = await removeFromCart(id)
    if (res.status) {
        return NextResponse.json({ status: true })
    } else {
        return NextResponse.json({ status: false })
    }
}