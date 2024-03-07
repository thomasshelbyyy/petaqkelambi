import { retrieveDataByQuery } from "@/lib/firebase/service"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")
    if (query) {
        const data = await retrieveDataByQuery("products", query)
        if (data.length > 0) {
            return Response.json({ status: true, statusCode: 200, data: data })
        } else {
            return Response.json({ status: false, statusCode: 404, message: "Product not found" })
        }
    } else {
        return Response.json({ status: false, statusCode: 404, message: "please enter the correct query" })
    }
}