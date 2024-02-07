import { NextResponse } from "next/server"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("order_id")
    const serverKey = process.env.SECRET
    const encodedSecret = btoa(encodeURIComponent(serverKey))

    try {
        const res = await fetch(`https://api.sandbox.midtrans.com/v2/${orderId}/status`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedSecret}:`
            }
        })
        const data = await res.json()
        return NextResponse.json({ status: true })
    } catch (error) {
        return NextResponse.json({ status: false, message: "error: " + error })
    }
}