import EditProductForm from "./Form"

const getData = async (id) => {
    const res = await fetch("http://localhost:3000/api/products?id=" + id)

    return res.json()
}

export default async function DashboardProductEdit({ params }) {
    const product = await getData(params.id)
    return (
        <EditProductForm product={product.data} id={params.id} />
    )
}