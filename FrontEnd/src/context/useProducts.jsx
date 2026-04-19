import { useEffect, useState } from "react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/services/productService.js";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET ALL
  const fetchProducts = async (categoryId = "") => {
    setLoading(true);
    try {
      const res = await getAllProducts(categoryId);
      setProducts(res.data.data);
    } catch (error) {
      console.log("fetch products error");
    } finally {
      setLoading(false);
    }
  };

  // ADD
  const addProduct = async (data) => {
    const res = await createProduct(data);
    setProducts((prev) => [...prev, res.data.data]);
  };

  // UPDATE
  const editProduct = async (id, data) => {
    const res = await updateProduct(id, data);
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? res.data.data : p))
    );
  };

  // DELETE
  const removeProduct = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return {
    products,
    loading,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
  };
};