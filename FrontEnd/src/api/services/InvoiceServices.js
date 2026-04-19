import API from "../axios.js";

// GET ALL INVOICES
export const getInvoices = () =>
  API.get("/invoice/get-invoices");

// CREATE INVOICE
export const createInvoice = (data) =>
  API.post("/invoice/create-invoice", data);