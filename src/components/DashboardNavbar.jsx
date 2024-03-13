"use client"

import { Bars3Icon, PowerIcon } from "@heroicons/react/24/solid"
import DashboardSidebar from "./DashboardSidebarBaru"
import { useState } from "react"
import { signOut } from "next-auth/react"
import Swal from "sweetalert2"

export default function DashboardNavbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    const handleLogout = () => {
        Swal.fire({
            title: "You want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                signOut()
            }
        });
    }
    return (
        <div className="w-screen text-white">
            <div className="w-full bg-gray-900 fixed top-0 z-50 flex justify-between px-5 py-3">
                <div>
                    <button className="md:hidden" onClick={toggleSidebar}>
                        <Bars3Icon className="w-6" />
                    </button>
                </div>
                <div>
                    <h1 className="text-xl font-semibold italic">petaqkelambi</h1>
                </div>
                <div>
                    <button onClick={handleLogout}><PowerIcon className="w-8 h-8 text-red-600" /></button>
                </div>
            </div>

            <DashboardSidebar isSidebarOpen={isSidebarOpen} />
        </div>
    )
}