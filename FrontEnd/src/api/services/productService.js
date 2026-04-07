import API from "../axios.js";

export const getAllProducts = () => API.get("/product/AllProduct");
export const createProduct = (data) => API.post("/create-product", data);
export const updateProduct = (id, data) => API.put(`/update-product/${id}`, data);
export const deleteProduct = (id) => API.delete(`/delete-product/${id}`);