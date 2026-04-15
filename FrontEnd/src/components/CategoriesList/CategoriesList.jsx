import { useEffect, useState } from "react"
import { getAllCategory } from './../../api/services/categoryService';

function CategoriesList({setSelectedCategory}) {
 
  const [products , setProduct] = useState([])

  useEffect(()=>{
    const fetchProduct =async ()=>{
      try {
        const res =await getAllCategory()
        setProduct(res.data.data)
      } catch (error) {
        console.log("error fetching Product")
      }
    }
    fetchProduct()
  }, [])

 return (
  <div className="w-full bg-slate-100 border-b p-2">
    <div className="flex gap-2">
      {products.map((product) => (
        <div
          onClick={() => setSelectedCategory(product)}
          key={product.name}
          className="flex-1 text-center p-3 rounded-md cursor-pointer 
          bg-white text-slate-700 border 
          hover:bg-blue-500 hover:text-white transition"
        >
          {product.name}
        </div>
      ))}
    </div>
  </div>
);
}

export default CategoriesList