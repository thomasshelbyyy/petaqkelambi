"use client"

import { InformationCircleIcon } from "@heroicons/react/24/solid"
import { Alert } from "flowbite-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

const LoginComponent = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const { push } = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/product/male/top"
    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: e.target.email.value,
                password: e.target.password.value,
                callbackUrl
            })

            e.target.reset()
            setIsLoading(false)

            if (!res?.error) {
                push(callbackUrl)
            } else {
                setError("Email or password is incorrect")
            }
        } catch (error) {
            e.target.reset()
            setIsLoading(false)
            setError("Email or password is incorrect")
        }

    }
    return (
        <main className="flex flex-col w-screen h-screen justify-center items-center bg-gray-400">
            {error && (
                <Alert color="failure" icon={InformationCircleIcon} className="mb-4">
                    <p className="font-medium">{error}</p>
                </Alert>
            )}
            <form className="w-3/4 md:w-2/6 mx-auto bg-gray-800 p-8 rounded-xl" onSubmit={handleLogin}>
                <h1 className="text-2xl font-semibold my-4 text-white">Login to Petaqkelambi</h1>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@domain.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className=" flex justify-between">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading ? "Loading..." : "Login to your account"}</button>
                    <div className="w-2/4">
                        <p className="text-white text-sm">You don&apos;t have account? <Link href="/register" className="text-blue-500">click here</Link> to create new account</p>
                    </div>
                </div>
            </form>
        </main>
    )
}

export default LoginComponent