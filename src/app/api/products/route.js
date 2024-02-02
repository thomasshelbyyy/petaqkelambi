import { retrieveData, retrieveDataById } from "@/lib/firebase/service";

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (id) {
        const data = await retrieveDataById("products", id.toString())
        return Response.json({ status: 200, message: "success", data: data })
    } else {
        const data = await retrieveData("products")
        return Response.json({ status: 200, message: "success", data })
    }
}