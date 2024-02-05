
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"



const ProductLayout = ({ children }) => {
    return (
        <div className="w-screen ">
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default ProductLayout