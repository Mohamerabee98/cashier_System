import API from "../axios.js";

export const getAllCategory = () => API.get("/category/all-categories");

// CREATE
export const createCategory = (data) =>
  API.post("/category/create-category", data);

// UPDATE
export const updateCategory = (id, data) =>
  API.put(`/category/update-category/${id}`, data);

// DELETE
export const deleteCategory = (id) =>
  API.delete(`/category/delete-category/${id}`);