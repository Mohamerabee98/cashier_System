import NavBar from "../../components/NavBar/NavBar"
import CategoriesList from "../../components/CategoriesList/CategoriesList"
import PaymentSection from "../../components/PaymentSection/PaymentSection"
import SelectedProducts from "../../components/SelectedProducts/SelectedProducts"
import ProductsByCategory from "../../components/ProductsByCategory/ProductsByCategory"

function Home() {
  return (
    <div className="h-screen flex flex-col">
      
      {/* Navbar */}
      <NavBar />

      {/* Categories */}
     
          <CategoriesList />
    

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Payment */}
        <div className="w-1/3 bg-gray-200 p-3 border-r">
          <PaymentSection />
        </div>

        {/* Selected Products */}
        <div className="w-1/3 bg-gray-300 p-3 border-r overflow-y-auto">
          <SelectedProducts />
        </div>

        {/* Products */}
        <div className="w-1/3 bg-gray-400 p-3 overflow-y-auto">
          <ProductsByCategory />
        </div>

      </div>
    </div>
  )
}

export default Home