import API from "../axios.js";

// GET ALL PRODUCTS (WITH OPTIONAL FILTER)
export const getAllProducts = (categoryId) =>
  API.get(`/product/${categoryId ? `?category=${categoryId}` : ""}`);

// CREATE
export const createProduct = (data) =>
  API.post("/product/create-product", data);

// UPDATE
export const updateProduct = (id, data) =>
  API.put(`/product/${id}`, data);

// DELETE
export const deleteProduct = (id) =>
  API.delete(`/product/${id}`);