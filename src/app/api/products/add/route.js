import { storeProduct } from "@/lib/firebase/service"
import { NextResponse } from "next/server"

export async function POST(request) {
    const req = await request.json()
    const res = await storeProduct(req)
    return NextResponse.json({ status: res.status, statusCode: res.statusCode, message: res.message })
}