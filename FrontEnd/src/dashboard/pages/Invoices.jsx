import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useInvoices } from "../../context/useInvoices";
import { useProducts } from "../../context/useProducts";

function Invoices() {
  const { invoices, fetchInvoices, addInvoice } = useInvoices();
  const { products, fetchProducts } = useProducts();

  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchInvoices();
    fetchProducts();
  }, []);

  // ================== ADD ITEM ==================
  const addItem = () => {
    setItems([...items, { product: "", quantity: 1 }]);
  };

  // ================== CHANGE ITEM ==================
  const handleItemChange = (index, field, value) => {
    const updated = [...items];

    updated[index] = {
      ...updated[index],
      [field]: field === "quantity" ? Number(value) : value,
    };

    setItems(updated);
  };
  // ================== CALCULATE TOTAL ==================
  const calculateTotal = () => {
    let total = 0;

    items.forEach((item) => {
      const product = products.find((p) => p._id === item.product);

      if (product) {
        total += product.price * item.quantity;
      }
    });

    return total;
  };

  // ================== SUBMIT ==================
  const handleSubmit = async () => {
    if (items.length === 0) {
      return Swal.fire("Error", "Add products", "error");
    }

    try {
      await addInvoice({ products: items });

      Swal.fire("Success", "Invoice created", "success");

      setItems([]);
      setShowModal(false);
    } catch {
      Swal.fire("Error", "Failed", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ================== HEADER ================== */}
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">Invoices</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded"
        >
          + Create Invoice
        </button>
      </div>

      {/* ================== INVOICES LIST ================== */}
      <div className="grid md:grid-cols-2 gap-4">
        {invoices.map((inv) => (
          <div key={inv._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">Cashier: {inv.cashier?.username}</h2>

            <p className="text-green-600 font-semibold mt-1">
              Total: {inv.total} EGP
            </p>

            <div className="mt-2 text-sm text-gray-600 ">
              {inv.products.map((p, i) => (
                <div key={i}>
                  {p.product?.name} × {p.quantity}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ================== MODAL ================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-[520px] rounded-2xl shadow-2xl overflow-hidden">
            {/* ================= HEADER ================= */}
            <div className="flex justify-between items-center px-5 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">
                Create New Invoice
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            {/* ================= BODY ================= */}
            <div className="p-5 max-h-[400px] overflow-y-auto">
              {items.length === 0 && (
                <p className="text-center text-gray-400 py-10">
                  No products added yet
                </p>
              )}

              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border rounded-xl p-3 mb-3 shadow-sm"
                >
                  <div className="flex gap-2 items-center">
                    {/* PRODUCT */}
                    <select
                      value={item.product}
                      onChange={(e) =>
                        handleItemChange(index, "product", e.target.value)
                      }
                      className="border p-2 flex-1 rounded-lg focus:outline-blue-500"
                    >
                      <option value="">Select product</option>

                      {products.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name} - {p.price} EGP
                        </option>
                      ))}
                    </select>

                    {/* QTY */}
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      className="border p-2 w-20 rounded-lg text-center"
                    />
                  </div>
                </div>
              ))}

              {/* ADD ITEM */}
              <button
                onClick={addItem}
                className="w-full bg-gray-100 hover:bg-gray-200 transition p-2 rounded-lg font-medium"
              >
                + Add Product
              </button>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="border-t p-4 bg-gray-50">
              {/* TOTAL BOX */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600">Total:</span>
                <span className="text-xl font-bold text-green-600">
                  {calculateTotal()} EGP
                </span>
              </div>

              {/* SUBMIT */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition"
              >
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Invoices;
