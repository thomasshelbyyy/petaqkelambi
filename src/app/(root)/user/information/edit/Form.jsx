"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const validatePhoneNumber = number => {
    const patern = /^(08|\+628)[0-9]{8,15}$/;

    const match = number.match(patern);

    return match;
}

const zipCodValidation = zip => {
    const regex = /^[0-9]+$/;
    const correct = zip.length == 5 && regex.test(zip)

    return correct
}

export default function EditUserForm({ user, id }) {
    const baseUrl = process.env.BASE_URL
    const [firstName, setFirstName] = useState(user?.firstName || "")
    const [lastName, setLastName] = useState(user?.lastName || "")
    const [username, setUsername] = useState(user?.username || "")
    const [phone, setPhone] = useState(user?.phone || "")
    const [state, setState] = useState(user?.address?.state || "")
    const [city, setCity] = useState(user?.address?.city || "")
    const [street, setStreet] = useState(user?.address?.street || "")
    const [zipCode, setZipCode] = useState(user?.address?.zipCode || "")
    const [errors, setErrors] = useState({})

    const { push } = useRouter()

    const validateForm = () => {
        const newErrors = {}

        const phoneString = phone.toString()
        const zipcodeString = zipCode.toString()

        if (phoneString.length > 0) {
            if (!validatePhoneNumber(phone)) {
                newErrors.phone = "Please insert the correct format"
            }
        }

        if (zipcodeString.length > 0) {
            if (!zipCodValidation(zipCode.toString())) {
                newErrors.zipCode = "Please insert te correct format"
            }
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isFormValid = validateForm()
        if (isFormValid) {
            const data = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                phone: phone,
                address: {
                    state: state,
                    city: city,
                    street: street,
                    zipCode: zipCode
                }
            }

            try {
                const res = await fetch(`${baseUrl}api/user/information/update`, {
                    method: "PUT",
                    body: JSON.stringify({ id: id, data: data })
                })

                const response = await res.json()

                if (res.ok) {
                    alert("user updated")
                } else {
                    alert("failed to update user")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div>
                <h1 className="font-semibold py-3 text-lg">General Information</h1>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            id="floating_first_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="floating_first_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            First Name
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                    </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-800 dark:text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" disabled value={user.email} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} id="floating_phone" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 ${errors.phone ? "border-red-600 focus:border-red-600 text-red-600" : "focus:border-blue-600"} focus:outline-none focus:ring-0  peer`} placeholder=" " />
                    <label htmlFor="floating_phone" className={`peer-focus:font-medium absolute text-sm  ${errors.phone ? " peer-focus:text-red-600" : "text-gray-800 peer-focus:text-blue-600"} duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Phone number (08xx-xxxx-xxxx)</label>
                </div>
            </div>
            <div>
                <h1 className="font-semibold py-3 text-lg">Addres</h1>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" id="floating_state" value={state} onChange={(e) => setState(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_state" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">State</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" id="floating_city" value={city} onChange={(e) => setCity(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" id="floating_street" value={street} onChange={(e) => setStreet(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_street" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="number" id="floating_zipcode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 ${errors.zipcode ? "border-red-600 focus:border-red-600 text-red-600" : "focus:border-blue-600"} focus:outline-none focus:ring-0  peer`} placeholder=" " />
                        <label htmlFor="floating_zipcode" className={`peer-focus:font-medium absolute text-sm  ${errors.zipcode ? " peer-focus:text-red-600" : "text-gray-800 peer-focus:text-blue-600"} duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Zip Code</label>
                    </div>
                </div>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

    )
}