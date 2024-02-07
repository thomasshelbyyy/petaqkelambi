export async function getData(url) {
    try {
        const res = await fetch(url, {
            cache: "no-store"
        })

        if (!res.ok) {
            throw new Error("failed to fetch data")
        }
        return res.json()
    } catch (error) {
        console.log(error)
    }
}