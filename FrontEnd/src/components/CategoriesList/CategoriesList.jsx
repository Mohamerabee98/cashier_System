import { useEffect, useState } from "react"
import { getAllProducts } from './../../api/services/productService';

function CategoriesList() {
 
  const [products , setProduct] = useState([])

  useEffect(()=>{
    const fetchProduct =async ()=>{
      try {
        const res =await getAllProducts()
        setProduct(res.data.data)
        // console.log(res.data.data)
      } catch (error) {
        console.log("error fetching Product")
      }
    }
    fetchProduct()
  }, [])

  return (
   <div className="w-full bg-blue-300 p-2">
      <div className="flex gap-2">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex-1 bg-white text-center p-3 rounded-lg shadow cursor-pointer hover:bg-blue-500 hover:text-white transition"
          >
            {product.name}
          </div>
        ))}
     
      {/* <h1>product</h1> */}
      </div>
    </div>
  )
}

export default CategoriesList