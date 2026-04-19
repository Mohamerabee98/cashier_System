import { useState } from "react";
import { getInvoices, createInvoice } from "../api/services/InvoiceServices";

export const useInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const res = await getInvoices();
      setInvoices(res.data.data);
    } catch (err) {
      console.log("fetch invoices error");
    }
  };

  const addInvoice = async (data) => {
  const res = await createInvoice(data);


  await fetchInvoices(); // reload clean data
};

  return {
    invoices,
    setInvoices,
    fetchInvoices,
    addInvoice,
  };
};