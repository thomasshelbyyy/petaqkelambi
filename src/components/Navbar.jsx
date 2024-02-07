"use client"

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { Dropdown } from 'flowbite-react'
import { usePathname } from 'next/navigation'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'

export default function Navbar() {
    const pathname = usePathname()
    const { data: session, status } = useSession()
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <p className="italic text-lg text-white">petaqKelambi</p>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        <Dropdown label="gender" className='text-white'>
                                            <Dropdown.Item>
                                                <Link href="/product/male">Male</Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <Link href="/product/female">Female</Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <Link href="/product/kids">Kids</Link>
                                            </Dropdown.Item>
                                        </Dropdown>
                                        {session?.user?.role === "admin" && (
                                            <Link
                                                href="/dashboard"
                                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                            >
                                                Dashboard
                                            </Link>
                                        )}
                                        {session?.user && (
                                            <>
                                                <Link
                                                    href="/user/information"
                                                    className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === "/user/information" || pathname === "/user/transactions" ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
                                                >
                                                    Profile
                                                </Link>
                                                <Link
                                                    href="/user/carts"
                                                    className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === "/user/carts" ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
                                                >
                                                    <ShoppingCartIcon className="w-6" />
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {status === "authenticated" ? (
                                    <div className="flex">
                                        <p>{session.user.email}</p>
                                        <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                        <button className="bg-white text-black px-2 py-1 rounded-md" onClick={() => signOut()}>Logout</button>
                                    </div>
                                ) : (
                                    <button className="bg-white text-black px-2 py-1 rounded-md" onClick={() => signIn()}>Login</button>
                                )}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {session?.user?.role === "admin" && (
                                <Disclosure.Button
                                    as="a"
                                    href="/dashboard"
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Dashboard
                                </Disclosure.Button>
                            )}
                            {session?.user && (
                                <>
                                    <Disclosure.Button
                                        as="a"
                                        href="/user/information"
                                        className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/user/information" || pathname === "/user/transactions" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "bg-gray-900 text-white"} `}
                                    >
                                        Profile
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as="a"
                                        href="/user/carts"
                                        className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/user/carts" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "bg-gray-900 text-white"} `}
                                    >
                                        <ShoppingCartIcon className="w-6" />
                                    </Disclosure.Button>
                                </>
                            )}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
