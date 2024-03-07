import { getData } from "@/lib/fetch/service";

export default async function SearchProductPage({ searchParams }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const data = await getData(`${baseUrl}api/products/search?query=${searchParams.query}`)

    console.log({ data })
    return (
        <div>hello world</div>
    )
}