import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useCart } from "../../context/CartContext";

function ProductsByCategory({ selectedCategory }) {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchProducts = async () => {
      try {
        const res = await API.get(`/product?category=${selectedCategory._id}`);
        setProducts(res.data.data);
      } catch (error) {
        console.log("error fetching products");
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  if (!selectedCategory) {
    return <p className="text-2xl text-center">اختار المنتج</p>;
  }

  return (
  <div className="grid grid-cols-2 gap-3">
    {products.map((product) => (
      <div
        key={product._id}
        onClick={() => addToCart(product)}
        className="text-center bg-white p-3 rounded-lg border cursor-pointer 
        hover:bg-blue-500 hover:text-white transition"
      >
        {product.name}
      </div>
    ))}
  </div>
);
}

export default ProductsByCategory;