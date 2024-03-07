
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"



const ProductLayout = ({ children }) => {
    return (
        <div className="w-screen ">
            <Navbar />
            <div className="pt-12">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default ProductLayout