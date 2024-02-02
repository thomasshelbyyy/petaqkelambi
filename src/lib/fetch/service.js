export async function getData(url) {
    const res = await fetch(url, {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("failed to fetch data")
    }
    return res.json()
}