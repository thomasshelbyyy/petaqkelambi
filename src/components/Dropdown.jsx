"use client"

import { useState } from "react"

export default function Dropdown({ children, buttonText }) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen)
    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    id="option-button"
                    onClick={toggleDropdown}
                >
                    {buttonText || "Options"}
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 space-y-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {children}
                </div>
            )}
        </div>
    )
}