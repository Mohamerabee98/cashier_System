import { useEffect, useState } from "react";
import { getInvoices } from "../../api/services/InvoiceServices";
import { getAllProducts } from "../../api/services/productService";
import { getAllCategory } from "../../api/services/categoryService";

function DashboardHome() {
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [invRes, prodRes, catRes] = await Promise.all([
        getInvoices(),
        getAllProducts(),
        getAllCategory(),
      ]);

      setInvoices(invRes.data.data);
      setProducts(prodRes.data.data);
      setCategories(catRes.data.data);
    } catch (err) {
      console.log("Dashboard error", err);
    }
  };

  // ================== STATS ==================
  const totalRevenue = invoices.reduce(
    (sum, inv) => sum + inv.total,
    0
  );

  const todayInvoices = invoices.filter((inv) => {
    const today = new Date().toDateString();
    return new Date(inv.createdAt).toDateString() === today;
  }).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen" dir="ltr">

      {/* ================= HEADER ================= */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Overview 
        </h1>
        <p className="text-gray-500">
          Welcome back, manage your system easily
        </p>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
          <p className="text-gray-500">Products</p>
          <h2 className="text-2xl font-bold">{products.length}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
          <p className="text-gray-500">Categories</p>
          <h2 className="text-2xl font-bold">{categories.length}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
          <p className="text-gray-500">Today Invoices</p>
          <h2 className="text-2xl font-bold">{todayInvoices}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold text-green-600">
            {totalRevenue} EGP
          </h2>
        </div>

      </div>

      {/* ================= RECENT INVOICES ================= */}
      <div className="mt-8 bg-white p-5 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4">
          Recent Invoices 
        </h2>

        {invoices.slice(0, 5).map((inv) => (
          <div
            key={inv._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <p className="font-semibold">
                {inv.cashier?.username}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(inv.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="font-bold text-green-600">
              {inv.total} EGP
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default DashboardHome;