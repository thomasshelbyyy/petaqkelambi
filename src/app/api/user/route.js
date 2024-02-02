import { retrieveDataById } from "@/lib/firebase/service";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    const res = await retrieveDataById("users", id.toString())
    return NextResponse.json({
        status: 200,
        message: "success",
        data: res
    })
}