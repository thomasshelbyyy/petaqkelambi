"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const RegisterPage = () => {

    const [isLoading, setIsLoading] = useState()
    const [error, setError] = useState("")
    const { push } = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const res = await fetch('/api/auth/register', {
            method: "POST",
            body: JSON.stringify({
                username: e.currentTarget.username.value,
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value
            })
        })

        if (res.status === 200) {
            e.target.reset()
            push('/login')
        } else {
            setError("Email already taken")
        }

        setIsLoading(false)
    }
    return (
        <main className="flex flex-col w-screen h-screen justify-center items-center bg-gray-400">
            {error && <p className="text-red-500">{error}</p>}
            <form className="w-3/4 md:w-2/6 mx-auto bg-gray-800 p-8 rounded-xl" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-semibold my-4 text-white">Register </h1>
                <div className="mb-5">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="text" id="username" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username here" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@domain.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" disabled={isLoading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading ? "Loading..." : "Create new account"}</button>
            </form>
        </main>
    )
}

export default RegisterPage