import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getData } from "@/lib/fetch/service";
import { getServerSession } from "next-auth";
import TransactionTable from "./Table";

const timestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Kalikan dengan 1000 karena timestamp dihitung dalam milidetik

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Tambahkan 1 karena bulan dimulai dari 0
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return formattedDate
}

export const metadata = {
    title: "User Transactions | Petaqkelambi"
}

export default async function TranactionsPage() {
    const baseUrl = process.env.BASE_URL
    const session = await getServerSession(authOptions)
    const data = await getData(`${baseUrl}/api/transaction?user_id=${session.user.id}`)

    console.log(data)
    return (
        <div className="min-h-screen w-full flex justify-center">
            <div className="w-11/12 md:w-8/12 rounded-ld bg-gray-800 text-gray-300 p-6">
                <h1 className="text-xl font-semibold mb-4">transactions</h1>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Subtotal
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Order date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.length > 0 && data.data.map((transaction, i) => (
                                <tr key={transaction.order_detail.order_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">
                                        {i + 1}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {transaction.order_detail.product_name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {transaction.order_detail.price.toLocaleString('id-ID', { style: "currency", currency: "IDR" })}
                                    </td>
                                    <td className="px-6 py-4">
                                        {transaction.order_detail.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {transaction.order_detail.gross_amount.toLocaleString('id-ID', { style: "currency", currency: "IDR" })}
                                    </td>
                                    <td className="px-6 py-4">
                                        {timestampToDate(transaction.order_detail.order_date.seconds)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {transaction.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}