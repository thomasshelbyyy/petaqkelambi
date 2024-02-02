import { addtransaction } from "@/lib/firebase/service";
import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
})

export async function POST(request) {
    const { id, productName, productId, quantity, price, firstName, lastName, phone, email, address, city, zipCode, userId } = await request.json()

    let parameter = {
        item_details: {
            name: productName,
            price: price,
            quantity: quantity,
        },
        transaction_details: {
            order_id: id,
            gross_amount: price * quantity
        },
        customer_details: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            billing_address: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                address: address,
                city: city,
                postal_code: zipCode,
                country_code: "IDN"
            },
            shipping_address: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                address: address,
                city: city,
                postal_code: zipCode,
                country_code: "IDN"
            }
        }
    }

    const token = await snap.createTransactionToken(parameter)
    if (token) {
        try {
            const res = await addtransaction(id, productName, productId, quantity, price, userId, firstName, lastName, phone, email, address, city, zipCode)
            if (res.status) {
                return NextResponse.json({ token })
            } else {
                console.log(res.message)
                return NextResponse.json({ status: false, message: res.message })
            }
        } catch (error) {
            return NextResponse.json({ status: false, message: "error: " + error })
        }
    } else {
        return NextResponse.json({ status: false, message: "failed to retrieve token from midtrans" })
    }
}