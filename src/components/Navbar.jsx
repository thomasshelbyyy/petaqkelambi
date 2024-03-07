"use client"

import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { usePathname, useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'
import { Dropdown, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { noProfile } from '@/assets/images'

const categories = ["top", "bottom", "shoes", "hat", "accessories"]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const { data: session, status } = useSession()
  const [inputValue, setInputValue] = useState("")

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const closeSidebar = () => setIsSidebarOpen(false)

  const handleSearch = (e) => {
    e.preventDefault()
    router.push(`/search?query=${encodeURIComponent(inputValue)}`)
  }

  return (
    <nav className="flex justify-between bg-gray-800 text-white fixed w-screen z-50">
      <div className="flex justify-between w-full px-6 py-4">

        <div className="flex gap-4">
          <button className="md:hidden w-4" onClick={toggleSidebar}>
            <Bars3Icon />
          </button>

          <div className="hidden md:flex md:gap-4 ">
            <a href="#" className="text-xl font-semibold italic">petaklemabi</a>

            <Dropdown
              label={
                <p className="text-sm">Male Product</p>
              }
              size="sm"
              inline
            >
              {categories.map(category => (
                <Dropdown.Item as={Link} href={`/product/male/${category}`} key={category}>{category}</Dropdown.Item>
              ))}
            </Dropdown>
            <Dropdown
              label={
                <p className="text-sm">Female Product</p>
              }
              size="sm"
              inline
            >
              {categories.map(category => (
                <Dropdown.Item as={Link} href={`/product/female/${category}`} key={category}>{category}</Dropdown.Item>
              ))}
            </Dropdown>
            <Dropdown
              label={
                <p className="text-sm">Kids Product</p>
              }
              size="sm"
              inline
            >
              {categories.map(category => (
                <Dropdown.Item as={Link} href={`/product/kid/${category}`} key={category}>{category}</Dropdown.Item>
              ))}
            </Dropdown>
          </div>
        </div>

        <div className="md:hidden text-xl italic">petaklemabi</div>

        <div className="flex">

          {status === "authenticated" ? (

            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Image alt="user profile" src={noProfile} className="w-10 h-10 rounded-full cursor-pointer" />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{session.user.username}</span>
                <span className="block truncate text-sm font-medium">{session.user.email}</span>
              </Dropdown.Header>
              {session.user.role === "admin" && (
                <Dropdown.Item as={Link} href="/dashboard">Dashboard</Dropdown.Item>
              )}
              <Dropdown.Item as={Link} href="/user/cart">Cart</Dropdown.Item>
              <Dropdown.Item as={Link} href="/user/information">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <button className="px-3 py-2 bg-gray-50 text-black rounded-md" onClick={() => signIn()}>Login</button>
          )}
        </div>
      </div>

      {/* SIDEBAR */}
      <div className={`w-full   h-screen fixed flex ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition `} id="sidebar">
        <div className="w-3/4 h-full px-4 py-6 bg-gray-800">
          <h1 className="text-xl italic font-semibold">Petaqkelambi</h1>
          <hr />
          <div className="py-1">
            <h2 className="font-semibold">Male Products</h2>
            <ul className="ml-3">
              {categories.map((category, id) => (
                <li className="hover:text-gray-100" key={id}>
                  <Link href={`/products/male/${category}`}>{category}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="py-1">
            <h2 className="font-semibold">Female Products</h2>
            <ul className="ml-3">
              {categories.map((category, id) => (
                <li className="hover:text-gray-100" key={id}>
                  <Link href={`/products/female/${category}`}>{category}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="py-1">
            <h2 className="font-semibold">Kid Products</h2>
            <ul className="ml-3">
              {categories.map((category, id) => (
                <li className="hover:text-gray-100" key={id}>
                  <Link href={`/products/kid/${category}`}>{category}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button className=" ml-3 mt-6 h-fit" onClick={closeSidebar}>
          <XMarkIcon className="w-6" />
        </button>
      </div>
    </nav>
  )
}
