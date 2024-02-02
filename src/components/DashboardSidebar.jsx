import { BanknotesIcon, BuildingStorefrontIcon, Cog8ToothIcon, HomeIcon, PowerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function DashboardSidebar() {
    return (
        <div id="menu" className="bg-white/10 col-span-3 rounded-lg p-4 ">
            <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent"> Dashboard<span className="text-indigo-400">.</span></h1>
            <p className="text-slate-400 text-sm mb-2">Welcome back,</p>
            <Link href="#" className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2">
                <div>
                    <div className="rounded-full w-10 h-10 relative object-cover bg-slate-400"></div>
                    {/* <img className="rounded-full w-10 h-10 relative object-cover" src="https://img.freepik.com/free-photo/no-problem-concept-bearded-man-makes-okay-gesture-has-everything-control-all-fine-gesture-wears-spectacles-jumper-poses-against-pink-wall-says-i-got-this-guarantees-something_273609-42817.jpg?w=1800&t=st=1669749937~exp=1669750537~hmac=4c5ab249387d44d91df18065e1e33956daab805bee4638c7fdbf83c73d62f125" alt="" /> */}
                </div>
                <div>
                    <p className="font-medium group-hover:text-indigo-400 leading-4">Jim Smith</p>
                </div>
            </Link>
            <hr className="my-2 border-slate-700" />
            <div id="menu" className="flex flex-col space-y-2 my-5">
                <Link href="/dashboard" className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <HomeIcon className="w-6 h-6 group-hover:text-indigo-400" />
                        <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Overview</p>
                    </div>
                </Link>
                <Link href="/dashboard/product" className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                    <div className="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <div>
                            <BuildingStorefrontIcon className="w-6 h-6 group-hover:text-indigo-400" />
                        </div>
                        <div>
                            <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Products</p>
                            <p className="text-slate-400 text-sm hidden md:block">Manage products</p>
                        </div>
                        <div className="absolute -top-3 -right-3 md:top-0 md:right-0 px-2 py-1.5 rounded-full bg-indigo-800 text-xs font-mono font-bold">23</div>
                    </div>
                </Link>
                <Link href="/dashboard/transaction" className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <div>
                            <BanknotesIcon className="w-6 h-6 group-hover:text-indigo-400" />
                        </div>
                        <div>
                            <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Transactions</p>
                            <p className="text-slate-400 text-sm hidden md:block">Manage transactions</p>
                        </div>

                    </div>
                </Link>
                <Link href="/dashboard/setting" className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <div>
                            <Cog8ToothIcon className="w-6 h-6 group-hover:text-indigo-400" />
                        </div>
                        <div>
                            <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Settings</p>
                            <p className="text-slate-400 text-sm hidden md:block">Edit settings</p>
                        </div>

                    </div>
                </Link>
                <button className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <PowerIcon className="text-red-500 w-6 h-6" />
                        <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Logout</p>
                    </div>
                </button>
            </div>
            <p className="text-sm text-center text-gray-600">v2.0.0.3 | &copy; 2022 Pantazi Soft</p>
        </div>
    )
}