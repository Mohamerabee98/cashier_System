import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCategories } from "../../context/useCategories";
import { useProducts } from "../../context/useProducts";

function Products() {
  const { categories } = useCategories();

  const {
    products,
    loading,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
  } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  // ================== LOAD ==================
  useEffect(() => {
    fetchProducts();
  }, []);

  // ================== FILTER BY CATEGORY ==================
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  // ================== OPEN ADD ==================
  const openAdd = () => {
    setFormData({ name: "", price: "", description: "" });
    setEditingId(null);
    setShowModal(true);
  };

  // ================== OPEN EDIT ==================
  const openEdit = (p) => {
    setFormData({
      name: p.name,
      price: p.price,
      description: p.description || "",
    });
    setEditingId(p._id);
    setShowModal(true);
  };

  // ================== CHANGE ==================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================== SUBMIT ==================
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      return Swal.fire("Error", "Name required", "error");
    }

    try {
      const payload = {
        ...formData,
        category: selectedCategory,
      };

      if (editingId) {
        await editProduct(editingId, payload);
        Swal.fire("Updated", "Product updated", "success");
      } else {
        await addProduct(payload);
        Swal.fire("Added", "Product created", "success");
      }

      setShowModal(false);
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // ================== DELETE ==================
  const handleDelete = async (id) => {
    const ok = await Swal.fire({
      title: "Delete product?",
      icon: "warning",
      showCancelButton: true,
    });

    if (ok.isConfirmed) {
      await removeProduct(id);
      Swal.fire("Deleted", "Product removed", "success");
    }
  };

  const isAll = selectedCategory === "";

return (
  <div className="p-6 bg-gray-50 min-h-screen">

    {/* ================== CATEGORIES ================== */}
    <div className="flex gap-2 mb-6 flex-wrap bg-white p-3 rounded-xl shadow-sm">

      <button
        onClick={() => setSelectedCategory("")}
        className={`px-4 py-2 rounded-full border transition ${
          isAll
            ? "bg-gray-900 text-white shadow"
            : "hover:bg-gray-100"
        }`}
      >
        All Products
      </button>

      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => setSelectedCategory(cat._id)}
          className={`px-4 py-2 rounded-full border transition ${
            selectedCategory === cat._id
              ? "bg-blue-600 text-white shadow-md"
              : "hover:bg-blue-50"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>

    {/* ================== ADD BUTTON ================== */}
    {!isAll && (
      <div className="mb-5">
        <button
          onClick={openAdd}
          className="bg-blue-600  cursor-pointer text-white px-5 py-2 rounded-lg shadow transition"
        >
          + Add Product
        </button>
      </div>
    )}

    {/* ================== LIST ================== */}
    {loading ? (
      <p className="text-center text-gray-500">Loading...</p>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition border"
          >

            {/* PRODUCT INFO */}
            <h1 className="text-lg font-bold text-gray-800">
              {p.name}
            </h1>

            <p className="text-green-600 font-semibold mt-1">
              {p.price} EGP
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Category: {p.category?.name}
            </p>

            {/* ACTIONS */}
            {!isAll && (
              <div className="flex gap-2 mt-4">

                <button
                  onClick={() => openEdit(p)}
                  className="flex-1 cursor-pointer bg-amber-500 hover:bg-amber-600 text-white py-1 rounded-lg transition"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 cursor-pointer bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg transition"
                >
                  Delete
                </button>

              </div>
            )}
          </div>
        ))}

      </div>
    )}
    
    {/* ================== MODAL ================== */}
    {showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">

        <div className="bg-white p-6 w-96 rounded-2xl shadow-xl relative animate-fadeIn">

          {/* CLOSE */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-2  text-xl font-bold  right-3 text-red-500  cursor-pointer"
          >
            ✕
          </button>

          <h2 className="text-xl font-bold mt-3 mb-4 text-gray-800">
            {editingId ? "Update Product" : "Add New Product"}
          </h2>

          {/* INPUTS */}
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-2 w-full mb-3 rounded-lg focus:outline-blue-500"
          />

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 w-full mb-3 rounded-lg focus:outline-blue-500"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 w-full mb-4 rounded-lg focus:outline-blue-500"
          />

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full p-2 rounded-lg transition"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>

        </div>
      </div>
    )}
  </div>
);
}

export default Products;