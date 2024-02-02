import { getAllCarts } from "@/lib/firebase/service";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const res = await getAllCarts(id)

    return NextResponse.json({ status: true, data: res })
}