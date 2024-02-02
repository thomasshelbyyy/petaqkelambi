import { getTransactionById } from "@/lib/firebase/service"
import { NextResponse } from "next/server"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("user_id")

    const res = await getTransactionById(id)
    if (res.status === 200) {
        return NextResponse.json({ status: res.status, data: res.data })
    } else {
        return NextResponse.json({ status: res.status, message: res.message })
    }
}