import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import noProfile from "@/assets/no-profile.png"
import Image from "next/image"
import Link from "next/link"

const getData = async (id) => {
    const baseUrl = process.env.BASE_URL
    const res = await fetch(`${baseUrl}api/user?id=${id}`, {
        cache: "no-store"
    })

    return res.json()
}

export const metadata = {
    title: "User Profile | Petaqkelambi"
}

export default async function UserInformationPage() {

    const session = await getServerSession(authOptions)
    const data = await getData(session.user.id)
    const user = data.data
    return (
        <div className="container mx-auto mt-8 flex flex-col items-center">
            <div className="lg:w-3/4">
                <div className=" flex flex-col items-center mb-4">
                    <Image width={100} height={100} src={user.image ? user.image : noProfile} alt={user.username} className="w-32 h-32 object-cover rounded-full mb-4" />
                    <p className="text-lg text-center font-semibold">{user.username}</p>
                </div>
                <section className="mb-8 p-4 bg-gray-200 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">General Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Name: {user.firstName ? user.firstName : ""}  {user.lastName ? user.lastName : ""}</p>
                            <p className="text-gray-600">Email: {user.email}</p>
                        </div>
                        <div className="md:mt-0 mt-4">
                            <p className="text-gray-600">Phone: {user.phone ? user.phone : '-'}</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8 p-4 bg-gray-200 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Address</h2>
                    <div>
                        <p className="text-gray-600">Street: {user.address ? user.address.street : '-'} </p>
                        <p className="text-gray-600">City: {user.address ? user.address.city : '-'} </p>
                        <p className="text-gray-600">State: {user.address ? user.address.state : '-'} </p>
                        <p className="text-gray-600">Zip Code: {user.address ? user.address.zipCode : '-'} </p>
                    </div>
                </section>

                <section className="mb-8 p-4 bg-gray-200 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Change Password</h2>
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        Change Password
                    </button>
                </section>

                <section className="p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Update Data</h2>
                    <Link href="/user/information/edit" className="bg-green-500 text-white font-bold py-2 px-4 rounded">Update Data</Link>
                </section>
            </div>
        </div>
    )
}