import { getData } from "@/lib/fetch/service"
import EditProductForm from "./Form"

export default async function DashboardProductEdit({ params }) {
    const baseUrl = process.env.BASE_URL
    const product = await getData(`${baseUrl}api/products?id=${params.id}`)
    return (
        <EditProductForm product={product.data} id={params.id} />
    )
}