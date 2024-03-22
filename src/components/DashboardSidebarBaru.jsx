"use client"

import { BanknotesIcon, BuildingStorefrontIcon, Cog8ToothIcon, HomeIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

export default function DashboardSidebar({ isSidebarOpen }) {
    return (
        <div className={`w-72 h-screen pt-14 fixed bg-gray-900 flex flex-col md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition z-40`}>
            <div className="p-4 text-lg w-full hover:bg-gray-600">
                <Link href="/dashboard" className="font-semibold flex gap-3"><HomeIcon className="w-8 h-8" />HOME</Link>
            </div>
            <div className="p-4 text-lg w-full hover:bg-gray-600">
                <Link href="/dashboard/product" className="font-semibold flex gap-3"><BuildingStorefrontIcon className="w-8 h-8" /> PRODUCTS</Link>
            </div>
            <div className="p-4 text-lg w-full hover:bg-gray-600">
                <Link href="/dashboard/transactions" className="font-semibold flex gap-3"><BanknotesIcon className="w-8 h-8" /> TRANSACTIONS</Link>
            </div>
            <div className="p-4 text-lg w-full hover:bg-gray-600">
                <Link href="/dashboard/setting" className="font-semibold flex gap-3"><Cog8ToothIcon className="w-8 h-8" /> SETTING</Link>
            </div>
        </div>
    )
}