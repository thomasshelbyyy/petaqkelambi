import { updateUser } from "@/lib/firebase/service"
import { NextResponse } from "next/server"

export async function PUT(request) {
    const { id, data } = await request.json()
    const res = await updateUser(id, data)

    return NextResponse.json({ status: res.status, statusCode: res.statusCode, message: res.message })
}