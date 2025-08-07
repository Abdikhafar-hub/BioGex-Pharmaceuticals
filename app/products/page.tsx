import ProductsCatalog from "../components/ProductsCatalog"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ProductsCatalog />
      <Footer />
    </div>
  )
} 