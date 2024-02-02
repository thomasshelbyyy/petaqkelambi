import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4">
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                <DashboardSidebar />
                <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}