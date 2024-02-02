import Link from "next/link"

const MediumCategory = ({ categories, gender }) => {
    return (
        <div className="hidden md:block w-1/4 bg-white p-4 rounded sticky top-0 ">
            <h2 className="text-lg font-bold mb-4">Kategori Produk</h2>
            <ul className="list-none p-0">
                {categories.map((category) => (
                    <li key={category} className="mb-2">
                        <Link href={`/product/${gender}/${category.toLowerCase()}`} className="text-blue-500 hover:underline focus:outline-none">{category}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MediumCategory