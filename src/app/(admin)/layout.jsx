import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }) {
    return (
        <div>
            <DashboardNavbar />
            <div className="pt-16 pb-4 md:pl-96">
                {children}
            </div>
        </div>
    )
}