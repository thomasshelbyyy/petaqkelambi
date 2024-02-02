import { updateProduct } from "@/lib/firebase/service"
import { NextResponse } from "next/server"

export async function PUT(request) {
    const req = await request.json()
    const res = await updateProduct(req)
    if (res.status) {
        return NextResponse.json({ status: res.status, statusCode: res.statusCode, message: res.message })
    } else {
        return NextResponse.json({ status: res.status, statusCode: res.statusCode, message: res.message })
    }
}