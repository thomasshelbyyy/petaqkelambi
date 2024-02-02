import { updateTransactionStatus } from "@/lib/firebase/service";
import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let apiClient = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
})

export async function POST(request) {
    const notificationJson = await request.json()
    const statusResponse = await apiClient.transaction.notification(notificationJson)

    const { order_id: orderId, transaction_status: transactionStatus, fraud_status: fraudStatus } = statusResponse
    console.log(`Transaction notification received, Order ID: ${orderId}, Transaction Status: ${transactionStatus}, Fraud Status: ${fraudStatus}`)
    const res = await updateTransactionStatus(orderId, transactionStatus)
    return NextResponse.json({ status: res.status, statusCode: res.statusCode, message: res.message })
}