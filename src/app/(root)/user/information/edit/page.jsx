import { getServerSession } from "next-auth"
import EditUserForm from "./Form"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const getData = async (id) => {
    const baseUrl = process.env.BASE_URL
    const res = await fetch(`${baseUrl}/api/user?id=${id}`, {
        cache: "no-store"
    })

    return res.json()
}

export const metadata = {
    title: "Edit Profile | Petaqkelambi"
}

export default async function EditUserInformationPage() {

    const session = await getServerSession(authOptions)
    const data = await getData(session.user.id)
    const user = data.data

    return (
        <div className="min-h-screen flex items-center">
            <EditUserForm user={user} id={session.user.id} />
        </div>
    )
}