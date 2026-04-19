import { useEffect, useState } from "react";
import {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/services/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategory();
      setCategories(res.data.data);
    } catch (error) {
      console.log("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (data) => {
    const res = await createCategory(data);
    setCategories((prev) => [...prev, res.data.data]);
  };

  const editCategory = async (id, data) => {
    const res = await updateCategory(id, data);
    setCategories((prev) =>
      prev.map((c) => (c._id === id ? res.data.data : c))
    );
  };

  const removeCategory = async (id) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c._id !== id));
  };

  return {
    categories,
    addCategory,
    editCategory,
    removeCategory,
  };
};