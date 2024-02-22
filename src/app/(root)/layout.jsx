
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import NextProgress from "nextjs-progressbar"



const ProductLayout = ({ children }) => {
    return (
        <div className="w-screen ">
            <NextProgress />
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default ProductLayout