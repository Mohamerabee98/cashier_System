import API from "../axios.js";

export const getAllCategory = () => API.get("/category/all-categories");
